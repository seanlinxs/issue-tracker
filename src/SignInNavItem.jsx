import PropTypes from 'prop-types';
import React from 'react';
import { NavItem, Modal, Button, NavDropdown, MenuItem } from 'react-bootstrap';

export default class SignInNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      disabled: true,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({ client_id: window.config.googleClientId })
        .then(() => {
          if (!window.gapi.auth2.getAuthInstance()) {
            if (!window.config || !window.config.googleClientId) {
              this.props.showError('Missing Google Client Id or config file /static/config.js');
            }
          } else {
            this.setState({ disabled: false });
          }
        });
    });
  }

  signIn() {
    this.hideModal();
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn()
      .then((googleUser) => {
        fetch('/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_token: googleUser.getAuthResponse().id_token }),
        })
          .then((response) => {
            if (response.ok) {
              response.json().then(user => this.props.onSignin(user.name));
            } else {
              response.json().then(err => this.props.showError(`App login failed: ${err}`));
            }
          })
          .catch(err => this.props.showError(`Error posting login to app: ${err}`));
      }, (err) => {
        this.props.showError(`Error authenticating with Google: ${err}`);
      });
  }

  signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    fetch('/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          auth2.signOut()
            .then(() => {
              this.props.showSuccess('Successfully signed out.');
              this.props.onSignout();
            });
        }
      });
  }

  showModal() {
    if (this.state.disabled) {
      this.props.showError('Missing Google Client ID or config file /static/config.js');
    } else {
      this.setState({ showing: true });
    }
  }

  hideModal() {
    this.setState({ showing: false });
  }

  render() {
    if (this.props.user.signedIn) {
      return (
        <NavDropdown title={this.props.user.name} id="user-dropdown">
          <MenuItem onClick={this.signout}>Sign out</MenuItem>
        </NavDropdown>
      );
    }

    return (
      <NavItem onClick={this.showModal}>
        Sign in
        <Modal
          keyboard
          show={this.state.showing}
          onHide={this.hideModal}
          bsSize="sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              block
              disabled={this.state.disabled}
              onClick={this.signIn}
            >
              <img src="/btn_google_signin_dark_normal_web.png" alt="Signin" />
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </NavItem>
    );
  }
}

SignInNavItem.propTypes = {
  user: PropTypes.object,
  onSignin: PropTypes.func.isRequired,
  onSignout: PropTypes.func.isRequired,
  showError: PropTypes.func.isRequired,
  showSuccess: PropTypes.func.isRequired,
};

SignInNavItem.defaultProps = {
  user: { signedIn: false, name: '' },
};
