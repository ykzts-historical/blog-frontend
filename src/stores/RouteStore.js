import { RouteStore } from 'fluxible-router';
import showArticlesAction from '../actions/showArticlesAction';
import ArticlesHandler from '../handlers/ArticlesHandler';

export default RouteStore.withStaticRoutes({
  articles: {
    path: '/',
    method: 'get',
    handler: ArticlesHandler,
    action: showArticlesAction
  },
  article: {
    path: '/post/:id',
    method: 'get',
    handler: ArticlesHandler,
    action: showArticlesAction
  }
});
