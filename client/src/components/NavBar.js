import React, { Component } from 'react';
import './NavBar.css';

import { NavLink, withRouter, matchPath } from 'react-router-dom';

class NavBarWithRouter extends Component {
  createNavLink(pathname, user) {
    if (!user) {
      return null;
    }

    const to = `/${user}`;
    return (
      <li className={pathname === to ? 'active' : null}>
        <NavLink to={`/${user}`} exact>
          Home
        </NavLink>
      </li>
    );
  }

  render() {
    const { pathname } = this.props.history.location;
    const match = matchPath(pathname, {
      path: '/:user',
      strict: false,
    });
    let user;
    if (match && match.params) {
      user = match.params.user;
    }

    const navLink = this.createNavLink(pathname, user);
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <div className="navbar-brand">
              <img
                alt="OpenFaaS"
                src="https://docs.openfaas.com/images/logo.svg"
              />
            </div>
            <p className="navbar-text">
              <div>OpenFaaS Cloud</div>
            </p>
          </div>
          <ul className="nav navbar-nav">{navLink}</ul>
        </div>
      </nav>
    );
  }
}

export const NavBar = withRouter(NavBarWithRouter);
