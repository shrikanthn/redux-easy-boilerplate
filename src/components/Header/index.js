import React, { Component } from 'react';
import { Link } from 'react-router';

import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
              <div className="navbar-header">
                  <Link to="/" className="navbar-brand"> HDP Sprint Retro</Link>
                  <Link to="/home" className="btn btn-default navbar-btn">Home </Link>
                  <Link to="/list" className="btn btn-default navbar-btn"> Sample Redux</Link>
                  <Link to="/testdb" className="btn btn-default navbar-btn"> Redux-TestDB</Link>
                  <Link to="/surveyResults" className="btn btn-default navbar-btn"> Survey Results</Link>
                  <Link to="/teamAverage" className="btn btn-default navbar-btn"> Team Average</Link>
              </div>
          </div>
      </nav>
    );
  }
}
