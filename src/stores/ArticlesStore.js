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
    this.currentArticles = articles;
    this.loading = false;
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
      currentArticles: this.getCurrentArticles(),
      loading: this.isLoading()
    };
  }

  rehydrate(state) {
    this.currentArticles = state.currentArticles;
    this.loading = state.loading;
  }
}

export default ArticlesStore;
