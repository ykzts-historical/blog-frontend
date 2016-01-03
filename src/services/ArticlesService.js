import request from 'superagent';
import { env } from 'process';
import querystring from 'querystring';

const TUMBLR_API_BASE_URI = 'https://api.tumblr.com/v2';

function fetchArticles(params, callback) {
  const apiParams = Object.assign({}, {
    api_key: env['TUMBLR_CONSUMER_KEY'],
    offset: typeof params['id'] !== 'undefined' ? 0 : 5 * ((params['page'] || 1) - 1),
    limit: typeof params['id'] !== 'undefined' ? 1 : 5
  }, params);
  const uri = [
    `${TUMBLR_API_BASE_URI}/blog/${env['TUMBLR_BLOG_HOST_NAME']}/posts`,
    querystring.stringify(apiParams)
  ].join('?');

  function fetchCallback(error, response) {
    if (error instanceof Error) {
      return callback(error);
    }
    const { meta: { status }, response: { blog, posts: articles } } = response.body;
    if (status === 200) {
      callback(null, { blog, articles });
    } else {
      callback(new Error('Not found.'));
    }
  }

  request
    .get(uri)
    .end(fetchCallback);
}

const ArticlesService = {
  name: 'articles',
  read: function(req, resource, routes, config, callback) {
    const params = Object.assign({}, routes.params, routes.query);
    fetchArticles(params, callback);
  }
};

export default ArticlesService;
