import { NavLink } from 'fluxible-router';
import React from 'react';

class ArticleComponent extends React.Component {
  static propTypes = {
    article: React.PropTypes.object.isRequired
  }

  getArticleId() {
    return this.props.article['id'];
  }

  getArticleTitle() {
    return this.props.article['title'];
  }

  getArticleContent() {
    const body = this.props.article['body'] || '';
    return body.replace(/\n/g, '');
  }

  render() {
    return (
      <div className='ArticleComponent'>
        <article>
          <header>
            <h2>
              <NavLink navParams={{ id: this.getArticleId() }} routeName='article'>{this.getArticleTitle()}</NavLink>
            </h2>
          </header>
          <div dangerouslySetInnerHTML={{ __html: this.getArticleContent() }}/>
        </article>
      </div>
    );
  }
}

export default ArticleComponent;
