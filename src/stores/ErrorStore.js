import { BaseStore } from 'fluxible/addons';

class ErrorStore extends BaseStore {
  static storeName = 'ErrorStore';
  static handlers = {
    NAVIGATE_FAILURE: 'setCurrentError'
  }

  constructor(dispatcher) {
    super(dispatcher);
    this.currentError = null;
  }

  setCurrentError(error) {
    this.currentError = error;
    this.emitChange();
  }

  getCurrentError() {
    return this.currentError;
  }

  dehydrate() {
    return {
      currentError: this.getCurrentError()
    };
  }

  rehydrate(state) {
    this.currentError = state.currentError;
  }
}

export default ErrorStore;
