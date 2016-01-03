import { connectToStores } from 'fluxible-addons-react';
import React from 'react';
import ErrorStore from '../stores/ErrorStore';

@connectToStores([ErrorStore], function(context) {
  return {
    currentError: context.getStore(ErrorStore).getCurrentError()
  };
})
class ErrorHandler extends React.Component {
  render() {
    return (
      <div id='ErrorHandler'>
        <p>{this.props.currentError.message}</p>
      </div>
    );
  }
}

export default ErrorHandler;
