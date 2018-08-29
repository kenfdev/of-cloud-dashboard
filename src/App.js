import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import { NavBar } from './components/NavBar';
import { FunctionsOverviewPage } from './pages/FunctionsOverviewPage';
import { FunctionLogPage } from './pages/FunctionLogPage';
import { NotFoundPage } from './pages/NotFoundPage';

export class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/:userId/overview" component={FunctionsOverviewPage} />
              <Route path="/:userId/overview/:functionName/log" component={FunctionLogPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </BrowserRouter>
        <p>
          Powered by <a href="https://www.openfaas.com">OpenFaaS</a>
        </p>
      </div>
    );
  }
}
