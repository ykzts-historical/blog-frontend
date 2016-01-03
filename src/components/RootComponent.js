import { connectToStores, provideContext } from 'fluxible-addons-react';
import React from 'react';
import BlogStore from '../stores/BlogStore';

@provideContext
@connectToStores([BlogStore], function(context) {
  return {
    currentBlogTitle: context.getStore(BlogStore).getCurrentBlogTitle()
  };
})
class RootComponent extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet='UTF-8'/>
          <link href='http://yui.yahooapis.com/pure/0.6.0/pure-min.css' rel='stylesheet'/>
          <title>{this.props.currentBlogTitle}</title>
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{ __html: this.props.markup }}/>
          <script dangerouslySetInnerHTML={{ __html: this.props.state }}/>
          <script src='/bundle.js'/>
        </body>
      </html>
    );
  }
}

export default RootComponent;
