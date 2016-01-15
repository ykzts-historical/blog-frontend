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
    let body = this.props.article['body'] || '';
    body = body.replace(/\n/g, '');
    body = [
      body,
      '<script>typeof twttr !== \'undefined\' && twttr.widgets.load();</script>'
    ].join('');
    return body;
  }

  render() {
    return (
      <div className='ArticleComponent'>
        <article className='mdl-card  mdl-cell mdl-cell--12-col mdl-shadow--2dp'>
          <header className='mdl-card__title'>
            <h2 className='mdl-card__title-text'>
              <NavLink navParams={{ id: this.getArticleId() }} routeName='article'>{this.getArticleTitle()}</NavLink>
            </h2>
          </header>
          <div className='mdl-card__supporting-text mdl-color-text--grey-700' dangerouslySetInnerHTML={{ __html: this.getArticleContent() }}/>
        </article>
      </div>
    );
  }
}

export default ArticleComponent;
