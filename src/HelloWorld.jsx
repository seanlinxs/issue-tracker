import React from 'react';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ addressee: 'Universe' });
    }, 500);
  }

  render() {
    return (
      <h1>Hello {this.state.addressee}!</h1>
    );
  }
}
