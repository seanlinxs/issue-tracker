import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;
const RoutedApp = () => (
  <Router>
    <div>
      <Redirect from="/" to="/issues" />
      <Switch>
        <Route exact path="/issues" component={withRouter(IssueList)} />
        <Route path="/issues/:id" component={IssueEdit} />
        <Route path="*" component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}
