import PropTypes from 'prop-types';
import QueryString from 'query-string';
import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import IssueFilter from './IssueFilter.jsx';
import withToast from './withToast.jsx';

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = props => (
  <tr>
    <td>{props.owner}</td>
    {statuses.map(status => (<td key={status}>{props.counts[status]}</td>))}
  </tr>
);

StatRow.propTypes = {
  owner: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
};

class IssueReport extends React.Component {
  static dataFetcher({ urlBase, location }) {
    const search = location.search ? `${location.search}&_summary` : '?_summary';
    return fetch(`${urlBase || ''}/api/issues${search}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then(error => Promise.reject(error));
        }

        return response.json().then(data => ({ IssueReport: data }));
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      stats: {},
    };
    this.setFilter = this.setFilter.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = QueryString.parse(prevProps.location.search);
    const newQuery = QueryString.parse(this.props.location.search);

    if (oldQuery.status === newQuery.status
      && oldQuery.effort_gte === newQuery.effort_gte
      && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }

    this.loadData();
  }

  setFilter(query) {
    const { location, history } = this.props;
    history.push({ pathname: location.pathname, search: QueryString.stringify(query) });
  }

  loadData() {
    IssueReport.dataFetcher({ location: this.props.location })
      .then((data) => {
        this.setState({ stats: data.IssueReport });
      })
      .catch(err => this.props.showError(`Error in fetching data from server: ${err}`));
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
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th />
              {statuses.map(status => <td key={status}>{status}</td>)}
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.stats).map(owner => (
              <StatRow key={owner} owner={owner} counts={this.state.stats[owner]} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

IssueReport.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  showError: PropTypes.func.isRequired,
};


const IssueReportWithToast = withToast(IssueReport);
IssueReportWithToast.dataFetcher = IssueReport.dataFetcher;

export default IssueReportWithToast;
