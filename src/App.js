import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import { NavBar } from './components/NavBar';
import { FunctionsOverviewPage } from './pages/FunctionsOverviewPage';
import { FunctionLogPage } from './pages/FunctionLogPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Breadcrumbs } from './components/Breadcrumbs';

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/" component={FunctionsOverviewPage} />
              <Route path="/:functionName/log" component={FunctionLogPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
          <p>
            Powered by <a href="https://www.openfaas.com">OpenFaaS</a>
          </p>
        </div>
      </BrowserRouter>
    );
  }
}
