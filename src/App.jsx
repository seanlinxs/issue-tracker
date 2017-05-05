import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';
import IssueReport from './IssueReport.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import withToast from './withToast.jsx';

const contentNode = document.getElementById('contents');

const NoMatch = () => <p>Page Not Found</p>;

const Header = props => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>Issue Tracker</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
      <LinkContainer to="/reports">
        <NavItem>Reports</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <IssueAddNavItem showError={props.showError} />
      <NavDropdown
        id="user-dropdown"
        title={<Glyphicon glyph="option-horizontal" />}
        noCaret
      >
        <MenuItem>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

Header.propTypes = {
  showError: PropTypes.func.isRequired,
};

const HeaderWithToast = withToast(Header);

const App = () => (
  <Router>
    <div>
      <HeaderWithToast />
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
