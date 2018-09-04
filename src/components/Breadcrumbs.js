import React, { Component } from 'react';
import './Breadcrumbs.css';
import { NavLink, withRouter } from 'react-router-dom';

class BreadcrumbsWithRouter extends Component {
  render() {
    const { pathname } = this.props.location;
    const paths = pathname.split('/').slice(1);

    const navs = paths.map(path => <li>{path}</li>);
    return (
      <ol className="breadcrumb">
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        {navs}
      </ol>
    );
  }
}

export const Breadcrumbs = withRouter(BreadcrumbsWithRouter);
