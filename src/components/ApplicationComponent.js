import { connectToStores, provideContext } from 'fluxible-addons-react';
import { handleHistory, NavLink } from 'fluxible-router';
import React from 'react';
import ErrorHandler from '../handlers/ErrorHandler';
import BlogStore from '../stores/BlogStore';

@handleHistory
@connectToStores([BlogStore], function(context) {
  return {
    currentBlogTitle: context.getStore(BlogStore).getCurrentBlogTitle()
  };
})
@provideContext
class ApplicationComponent extends React.Component {
  getCurrentHandler() {
    const currentRoute = this.props.currentRoute;
    const currentHandler = currentRoute && currentRoute['handler'];
    return currentHandler || ErrorHandler;
  }

  componentDidUpdate() {
    document.title = this.props.currentBlogTitle;
  }

  render() {
    const Handler = this.getCurrentHandler();
    return (
      <div className='ApplicationComponent'>
        <h1>
          <NavLink routeName='articles'>{this.props.currentBlogTitle}</NavLink>
        </h1>
        <Handler/>
      </div>
    );
  }
}

export default ApplicationComponent;
