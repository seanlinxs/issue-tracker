import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import { Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import QueryString from 'query-string';
import IssueFilter from './IssueFilter.jsx';
import Toast from './Toast.jsx';

const PAGE_SIZE = 10;

const IssueRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }

  return (
    <tr>
      <td><Link to={`/issues/${props.issue._id}`}>{props.issue._id}</Link></td>
      <td>{props.issue.status}</td>
      <td>{props.issue.owner}</td>
      <td>{props.issue.created.toDateString()}</td>
      <td>{props.issue.effort}</td>
      <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
      <td>{props.issue.title}</td>
      <td>
        <Button bsSize="xsmall" onClick={onDeleteClick}>
          <Glyphicon glyph="trash" />
        </Button>
      </td>
    </tr>
  );
};

IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

const IssueTable = (props) => {
  const issues = props.issues.map(issue => (
    <IssueRow
      key={issue._id}
      issue={issue}
      deleteIssue={props.deleteIssue}
    />
  ));

  return (
    <Table bordered condensed hover responsive>
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {issues}
      </tbody>
    </Table>
  );
};

IssueTable.propTypes = {
  issues: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func.isRequired,
};

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      issues: [],
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };

    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.selectPage = this.selectPage.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = QueryString.parse(prevProps.location.search);
    const newQuery = QueryString.parse(this.props.location.search);

    if (oldQuery.status === newQuery.status
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte
      && oldQuery._page === newQuery._page) {
      return;
    }

    this.loadData();
  }

  setFilter(query) {
    const { location, history } = this.props;
    history.push({ pathname: location.pathname, search: QueryString.stringify(query) });
  }

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIssue),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedIssue) => {
          updatedIssue.created = new Date(updatedIssue.created);

          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }

          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      } else {
        response.json().then((error) => {
          this.showError(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch((err) => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          this.showError('Failed to delete issue');
        } else {
          this.loadData();
        }
      });
  }

  loadData() {
    const query = Object.assign({}, QueryString.parse(this.props.location.search));
    const pageStr = query._page;

    if (pageStr) {
      delete query._page;
      query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
    }

    query._limit = PAGE_SIZE;
    const search = QueryString.stringify(query);

    fetch(`/api/issues?${search}`)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log('Total count of records:', data._metadata.totalCount);
            data.records.forEach((issue) => {
              issue.created = new Date(issue.created);

              if (issue.completionDate) {
                issue.completionDate = new Date(issue.completionDate);
              }
            });
            this.setState({
              totalCount: data._metadata.totalCount,
              issues: data.records,
            });
          });
        } else {
          response.json().then((error) => {
            this.showError(`Failed to fetch issues: ${error.message}`);
          });
        }
      })
      .catch((err) => {
        this.showError(`Error in fetching data from server: ${err}`);
      });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  selectPage(eventKey) {
    const query = Object.assign(
      QueryString.parse(this.props.location.search),
      { _page: eventKey },
    );
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: QueryString.stringify(query),
    });
  }

  render() {
    return (
      <div>
        <Panel collapsible header="Filter">
          <IssueFilter
            setFilter={this.setFilter}
            initFilter={QueryString.parse(this.props.location.search)}
          />
        </Panel>
        <Pagination
          items={Math.ceil(this.state.totalCount / PAGE_SIZE)}
          activePage={parseInt(QueryString.parse(this.props.location.search)._page || '1', 10)}
          onSelect={this.selectPage}
          maxButtons={7}
          next
          prev
          boundaryLinks
        />
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
        <Toast
          showing={this.state.toastVisible}
          message={this.state.toastMessage}
          onDismiss={this.dismissToast}
          bsStyle={this.state.toastType}
        />
      </div>
    );
  }
}

IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
