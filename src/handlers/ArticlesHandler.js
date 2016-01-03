import { connectToStores } from 'fluxible-addons-react';
import React from 'react';
import ArticleComponent from '../components/ArticleComponent';
import ArticlesStore from '../stores/ArticlesStore';

@connectToStores([ArticlesStore], function(context) {
  return {
    currentArticles: context.getStore(ArticlesStore).getCurrentArticles()
  };
})
class ArticlesHandler extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div id='ArticlesHandler'>
        {(this.props.currentArticles || []).map((article) =>
          <ArticleComponent article={article} key={article['id']}/>
        )}
      </div>
    );
  }
}

export default ArticlesHandler;
