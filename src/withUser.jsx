import React from 'react';

function withUser(user, OriginalComponent) {
  return class WithUser extends React.Component {
    render() {
      return (
        <OriginalComponent {...this.props} user={user} />
      );
    }
  };
}

export default withUser;
