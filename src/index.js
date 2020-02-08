import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Presentation from './Presentation';
import presentation from './presentation.md';
import './styles.sass';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route
        path="/slides/:index"
        component={(props) => <Presentation {...props} source={presentation} />}
      />
      <Redirect to="/slides/1" />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
