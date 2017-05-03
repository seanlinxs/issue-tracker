import React from 'react';
import ReactDOM from 'react-dom';
import { Link, BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

const App = () => (
  <Router>
    <div>
      <div className="header">
        <h1>Issue Tracker</h1>
      </div>
      <div className="contents">
        <Switch>
          <Route exact path="/issues" component={IssueList} />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <div className="footer">
        Full source code available at <a href="https://github.com/seanlinxs/issue-tracker">https://github.com/seanlinxs/issue-tracker</a>
      </div>
    </div>
  </Router>
);

ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}
