import React from 'react';
import { Route, IndexRoute } from 'react-router';

/* containers */
import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { List } from 'containers/List';
import { TestDB } from 'containers/TestDB';
import { SurveyResults } from 'containers/SurveyResults';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="list" component={List} />
    <Route path="testdb" component={TestDB} />
    <Route path="surveyResults" component={SurveyResults} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
