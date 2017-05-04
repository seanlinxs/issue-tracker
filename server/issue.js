const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'required',
  created: 'required',
  completionDate: 'optional',
  title: 'required',
};

function cleanUpIssue(issue) {
  const cleanedUpIssue = {};

  Object.keys(issue).forEach((field) => {
    if (issueFieldType[field]) {
      cleanedUpIssue[field] = issue[field];
    }
  });

  return cleanedUpIssue;
}

function validateIssue(issue) {
  const errors = [];

  Object.keys(issueFieldType).forEach((field) => {
    if (issueFieldType[field] === 'required' && !issue[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (!validIssueStatus[issue.status]) {
    errors.push(`${issue.status} is not a valid status.`);
  }

  return (errors.length ? errors.join('; ') : null);
}

function convertIssue(issue) {
  if (issue.created) {
    issue.created = new Date(issue.created);
  }

  if (issue.completionDate) {
    issue.completionDate = new Date(issue.completionDate);
  }

  return cleanUpIssue(issue);
}

export default {
  validateIssue,
  cleanUpIssue,
  convertIssue,
};
