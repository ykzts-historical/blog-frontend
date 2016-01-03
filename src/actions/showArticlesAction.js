function showArticlesAction(context, route, done) {
  context.dispatch('RECEIVE_ARTICLES_START');
  context.service.read('articles', route, {}, function(error, data) {
    if (error instanceof Error) {
      return done(error);
    }
    context.dispatch('RECEIVE_BLOG_SUCCESS', {
      blog: data.blog
    });
    context.dispatch('RECEIVE_ARTICLES_SUCCESS', {
      articles: data.articles
    });
    done();
  });
}

export default showArticlesAction;
