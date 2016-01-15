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
          <meta content='width=device-width,initial-scale=1.0' name='viewport'/>
          <link href='/bundle.css' rel='stylesheet'/>
          <link href='//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css' rel='stylesheet'/>
          <link href='//fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
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
