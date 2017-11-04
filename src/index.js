import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import promise from 'redux-promise';

import PostsNew from './components/posts_new';
import PostsEdit from './components/posts_edit';
import PostsShow from './components/posts_show';
import Posts from './components/posts';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/posts/new' component={PostsNew} />
          <Route path='/posts/:id/edit' component={PostsEdit} />
          <Route path='/posts/:id' component={PostsShow} />
          <Route path='/' component={Posts} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('.container')
);
