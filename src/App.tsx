import React from 'react';
import Auth from './components/Auth/Auth';
import Page from './components/Page/Page';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Auth} path="/" exact />
        <Route component={Page} path="/cabinet" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
