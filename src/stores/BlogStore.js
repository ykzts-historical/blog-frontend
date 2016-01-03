import { BaseStore } from 'fluxible/addons';

class BlogStore extends BaseStore {
  static storeName = 'BlogStore';
  static handlers = {
    RECEIVE_BLOG_SUCCESS: 'receiveBlogSuccess'
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.currentBlogTitle = null;
  }

  receiveBlogSuccess({ blog }) {
    this.currentBlogTitle = blog.title;
    this.emitChange();
  }

  getCurrentBlogTitle() {
    return this.currentBlogTitle;
  }

  dehydrate() {
    return {
      currentBlogTitle: this.getCurrentBlogTitle()
    };
  }

  rehydrate(state) {
    this.currentBlogTitle = state.currentBlogTitle;
  }
}

export default BlogStore;
