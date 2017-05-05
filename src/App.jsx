import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueReport from './IssueReport.jsx';
import Header from './Header.jsx';

const contentNode = document.getElementById('contents');

const NoMatch = () => <p>Page Not Found</p>;

const App = () => (
  <Router>
    <div>
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/issues" component={IssueList} />
          <Route path="/issues/:id" component={IssueEdit} />
          <Route path="/reports" component={IssueReport} />
          <Route component={NoMatch} />
        </Switch>
        <hr />
        <h5>
          <small>
            Full source code available at <a href="https://github.com/seanlinxs/issue-tracker">https://github.com/seanlinxs/issue-tracker</a>
          </small>
        </h5>
      </div>
    </div>
  </Router>
);

ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}
