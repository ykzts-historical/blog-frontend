import Fluxible from 'fluxible';
import fetchrPlugin from 'fluxible-plugin-fetchr';
import ApplicationComponent from './components/ApplicationComponent';
import ArticleStore from './stores/ArticlesStore';
import BlogStore from './stores/BlogStore';
import ErrorStore from './stores/ErrorStore';
import RouteStore from './stores/RouteStore';

const application = new Fluxible({
  component: ApplicationComponent,
  stores: [
    ArticleStore,
    BlogStore,
    ErrorStore,
    RouteStore
  ]
});

application.plug(fetchrPlugin({
  xhrPath: '/_api'
}));

export default application;
