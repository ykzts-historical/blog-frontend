import { BaseStore } from 'fluxible/addons';

class ArticlesStore extends BaseStore {
  static storeName = 'ArticlesStore';
  static handlers = {
    RECEIVE_ARTICLES_START: 'receiveArticlesStart',
    RECEIVE_ARTICLES_SUCCESS: 'receiveArticlesSuccess'
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.loading = true;
    this.currentArticles = [];
  }

  receiveArticlesStart() {
    this.loading = true;
    this.currentArticles = [];
    this.emitChange();
  }

  receiveArticlesSuccess({ articles }) {
    this.loading = false;
    this.currentArticles = articles;
    this.emitChange();
  }

  getCurrentArticles() {
    return this.currentArticles;
  }

  isLoading() {
    return this.loading;
  }

  dehydrate() {
    return {
      currentArticles: this.getCurrentArticles()
    };
  }

  rehydrate(state) {
    this.currentArticles = state.currentArticles;
  }
}

export default ArticlesStore;
