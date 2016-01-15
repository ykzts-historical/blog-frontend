import { connectToStores } from 'fluxible-addons-react';
import React from 'react';
import ArticleComponent from '../components/ArticleComponent';
import ArticlesStore from '../stores/ArticlesStore';

@connectToStores([ArticlesStore], function(context) {
  const articlesStore = context.getStore(ArticlesStore);
  return {
    currentArticles: articlesStore.getCurrentArticles(),
    isLoading: articlesStore.isLoading()
  };
})
class ArticlesHandler extends React.Component {
  static contextTypes = {
    getStore: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div id='ArticlesHandler'>
        <div className='mdl-grid'>
          {(this.props.currentArticles || []).map((article) =>
            <ArticleComponent article={article} key={article['id']}/>
          )}
          <div className={`${this.props.isLoading ? 'is-active ' : ''}loading`}>
            <i className='fa fa-3x fa-spin fa-spinner'/>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesHandler;
