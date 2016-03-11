import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App } from 'containers/App';
import { Home } from 'containers/Home';
import { List } from 'containers/List';
import { TestDB } from 'containers/TestDB';
import { SurveyResults } from 'containers/SurveyResults';
import { TeamAverage } from 'containers/TeamAverage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="list" component={List} />
    <Route path="testdb" component={TestDB} />
    <Route path="surveyResults" component={SurveyResults} />
    <Route path="teamAverage" component={TeamAverage} />
    <Route status={404} path="*" component={Home} />
  </Route>
);
