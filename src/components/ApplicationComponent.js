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
        <div className='mdl-js-layout mdl-layout'>
          <header className='mdl-layout__header'>
            <div className='mdl-layout__header-row'>
              <span className='mdl-layout__title'>
                <NavLink routeName='articles'>{this.props.currentBlogTitle}</NavLink>
              </span>
            </div>
          </header>
          <main className='mdl-layout__content'>
            <Handler/>
            <footer className='mdl-mini-footer'>
              <div className='mdl-mini-footer__left-section'>
                <ul className='mdl-mini-footer__link-list'>
                  <li>
                    <NavLink routeName='articles'>Home</NavLink>
                  </li>
                </ul>
              </div>
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

export default ApplicationComponent;
