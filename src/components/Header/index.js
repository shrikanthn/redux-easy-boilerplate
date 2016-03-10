import React, { Component } from 'react';
import { Link } from 'react-router';

/* component styles */
import { styles } from './styles.scss';

export class Header extends Component {
  render() {
    return (
      <header className={`${styles}`}>
        <div className="container">
          <div className="row">
            <div className="col-xs-5 col-sm-3 col-md-3 col-lg-3 logo">
              <Link to="/">
                Redux Boilerplate
              </Link>
            </div>

            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
              <nav>
                <Link to="/home" activeClassName="active">
                  Home
                </Link>
                <Link to="/list" activeClassName="active">
                  Redux
                </Link>
                <Link to="/testdb" activeClassName="active">
                  TestDB
                </Link>
                <Link to="/surveyResults" activeClassName="active">
                  Survey Results
                </Link>
              </nav>
            </div>

          </div>
        </div>
      </header>
    );
  }
}
