import React, { Component } from 'react';
import './NavBar.css';

import { NavLink, withRouter, matchPath } from 'react-router-dom';

class NavBarWithRouter extends Component {
  render() {
    const { pathname } = this.props.history.location;
    const match = matchPath(pathname, {
      path: '/:user',
      strict: false,
    });
    const { user } = match.params;

    const to = `/${user}`;
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img
                alt="OpenFaaS"
                src="https://docs.openfaas.com/images/logo.svg"
              />
            </a>
            <a className="navbar-text" href="#">
              OpenFaaS
            </a>
          </div>
          <ul className="nav navbar-nav">
            <li className={pathname === to ? 'active' : null}>
              <NavLink to={`/${user}`} exact activeClassName="active">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export const NavBar = withRouter(NavBarWithRouter);
