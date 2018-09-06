import React from 'react';
import './NavBar.css';

export const NavBar = () => {
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
          <li className="active">
            <a href="#">Home</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
