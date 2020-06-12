import React, { Component } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';

export class EmailForm extends Component {
  constructor() {
    super();
    this.state = { message: '', email:'' };
    this.onSubmit = this.onSubmit.bind(this);
  }

  _handleChange = e => {
    console.log({
        [`${e.target.name}`]: e.target.value,
    })
    this.setState({
        [`${e.target.name}`]: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('submit', this.state)

    addToMailchimp(this.state.email, this.state)
    .then(({ msg, result }) => {
        console.log('msg', `${result}: ${msg}`)

        if (result !== 'success') {
            throw msg
        }
        this.setState({ message: msg });
        console.log(this.state)
        // alert(this.state.message)
    })
    .catch(err => {
        console.log('err', err)
        this.setState({ message: err });
        console.log(this.state)
        // alert(err)
    })

    // this.setState({ message: 'Thank you!' });
    setTimeout(() => {
      this.setState({ message: '' });
    }, 9000);
  }

  render() {
    const { message } = this.state;
    return (
      <form id="signup-form" onSubmit={this.onSubmit} method="post" action="#">
        <input
          type="email"
          onChange={this._handleChange} 
          name="email"
          id="email"
          placeholder="Email Address"
        />
        <input type="submit" value="Sign Up" /><br/>
        <span className={`${message ? 'visible success' : ''} message`}>
          {message}
        </span>
      </form>
    );
  }
}

export default EmailForm;
