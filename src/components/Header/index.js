import React, { Component } from 'react';
import { Link } from 'react-router';

import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
              <div className="navbar-header">
                  <Link to="/home" className="navbar-brand"> HDP Sprint Retro
                  </Link>
                  <button type="button" className="btn btn-default navbar-btn">
                      <Link to="/"> Home
                      </Link>
                  </button>
                  <button type="button" className="btn btn-default navbar-btn">
                      <Link to="/list"> Sample Redux
                      </Link>
                  </button>
                  <button type="button" className="btn btn-default navbar-btn">
                      <Link to="/testdb"> Redux-TestDB
                      </Link>
                  </button>
                  <button type="button" className="btn btn-default navbar-btn">
                      <Link to="/surveyResults"> Survey Results
                      </Link>
                  </button>
              </div>
          </div>
      </nav>
    );
  }
}
