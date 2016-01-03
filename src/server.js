import 'babel-polyfill';
import { createElementWithContext } from 'fluxible-addons-react';
import { navigateAction } from 'fluxible-router';
import Koa from 'koa';
import convert from 'koa-convert';
import logger from 'koa-logger';
import serve from 'koa-static';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import application from '../src/application';
import RootComponent from '../src/components/RootComponent';
import ArticlesService from '../src/services/ArticlesService';

const server = new Koa();
const fetchrPlugin = application.getPlugin('FetchrPlugin');

fetchrPlugin.registerService(ArticlesService);

server.use(logger());
server.use((function() {
  const xhrPath = fetchrPlugin.getXhrPath();
  const middleware = fetchrPlugin.getMiddleware();
  return async function(ctx, next) {
    if (ctx.url.startsWith(xhrPath)) {
      const req = {
        method: ctx.req.method.toUpperCase(),
        path: ctx.url.slice(xhrPath.length),
        query: ctx.request.query
      };
      await new Promise(function(resolve, reject) {
        const res = {
          status(statusCode) {
            ctx.status = statusCode;
            return this;
          },
          set(headers) {
            for (const [key, value] of Object.entries(headers)) {
              ctx.set(key, value);
            }
            return this;
          },
          json(data) {
            ctx.body = data;
            resolve();
            return this;
          }
        };
        middleware(req, res, function(error) {
          if (error instanceof Error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
    } else {
      await next();
    }
  };
})());
server.use(convert(serve(`${__dirname}/../public`)));
server.use(async function(ctx, next) {
  ctx.status = 200;
  ctx.context = application.createContext();
  await next();
  const html = renderToStaticMarkup(React.createElement(RootComponent, {
    context: ctx.context.getComponentContext(),
    markup: renderToString(createElementWithContext(ctx.context)),
    state: `window.App = ${serialize(application.dehydrate(ctx.context))}`
  }));
  ctx.type = 'text/html; charset=utf-8';
  ctx.body = `<!DOCTYPE html>\n${html}`;
});

server.use(async function(ctx, next) {
  try {
    await ctx.context.executeAction(navigateAction, {
      url: ctx.url
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    ctx.status = statusCode;
  } finally {
    await next();
  }
});

export default server;
