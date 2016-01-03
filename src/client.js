import { createElementWithContext } from 'fluxible-addons-react';
import { render } from 'react-dom';
import application from './application';

const dehydratedState = window.App;

application.rehydrate(dehydratedState, function(error, context) {
  if (error instanceof Error) {
    throw error;
  }
  render(createElementWithContext(context), document.getElementById('app'));
});
