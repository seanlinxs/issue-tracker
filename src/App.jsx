import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'whatwg-fetch';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueReport from './IssueReport.jsx';
import Header from './Header.jsx';
import withUser from './withUser.jsx';

const contentNode = document.getElementById('contents');

const NoMatch = () => <p>Page Not Found</p>;

export default class App extends React.Component {
  static dataFetcher({ urlBase, cookie }) {
    const headers = cookie ? { Cookie: cookie } : null;

    return fetch(`${urlBase || ''}/api/users/me`, {
      headers,
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
        }

        return response.json().then(data => ({ App: data }));
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.onSignin = this.onSignin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount() {
    App.dataFetcher({ })
      .then((data) => {
        const user = data.App;
        this.setState({ user });
      });
  }

  onSignin(name) {
    this.setState({ user: { signedIn: true, name } });
  }

  onSignout() {
    this.setState({ user: { signedIn: false, name: '' } });
  }

  render() {
    const IssueListWithUser = withUser(this.state.user, IssueList);
    const IssueEditWithUser = withUser(this.state.user, IssueEdit);
    const IssueReportWithUser = withUser(this.state.user, IssueReport);

    return (
      <Router>
        <div>
          <Header
            user={this.state.user}
            onSignin={this.onSignin}
            onSignout={this.onSignout}
          />
          <div className="container-fluid">
            <Switch>
              <Route exact path="/issues" component={IssueListWithUser} />
              <Route path="/issues/:id" component={IssueEditWithUser} />
              <Route path="/reports" component={IssueReportWithUser} />
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
  }
}

ReactDOM.render(<App />, contentNode);

if (module.hot) {
  module.hot.accept();
}
