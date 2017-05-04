import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;

    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });

    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <div>
        <Form inline name="issueAdd" onSubmit={this.handleSubmit}>
          <FormControl name="owner" placeholder="Owner" />
          {' '}
          <FormControl name="title" placeholder="Title" />
          {' '}
          <Button type="submit" bsStyle="primary">Add</Button>
        </Form>
      </div>
    );
  }
}

IssueAdd.propTypes = {
  createIssue: PropTypes.func.isRequired,
};
