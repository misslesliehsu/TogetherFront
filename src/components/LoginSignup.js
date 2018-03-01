import React, { Component } from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'

class LoginSignup extends Component {

  state = {
    login_email: '',
    login_password:'',
    signup_email: '',
    signup_password: '',
    signup_password_confirmation: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    if (e.target.name ==='login'){
      fetch(`http://localhost:3001/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            email: this.state.login_email,
            password: this.state.login_password
          }
        )
      }).then(res => res.json())
      .then(res => {
        this.props.login(res.user),
        localStorage.setItem('token', res.token),
        this.props.history.push('/dashboard')
      })
    }
    else {

    }
  }

  render() {
    return (
      <div>
        <p>Login Page </p>
          <input type='text' name='login_email' value={this.state.login_email} onChange={this.handleChange} placeholder='Email Address'></input>
          <input type='text' name='login_password' value={this.state.login_password} onChange={this.handleChange} placeholder='Password'></input>
          <br></br><button name='login' onClick={this.handleSubmit}>Login</button>
          <p>Sign Up</p>
          <input type='text' name='signup_email'value={this.state.signup_email} onChange={this.handleChange} placeholder='Email Address'></input>
          <input type='password'name='signup_password' value={this.state.signup_password} onChange={this.handleChange} placeholder='Password'></input>
          <input type='password' name='signup_password_confirmation' value={this.state.signup_password_confirmation} onChange={this.handleChange} placeholder='Confirm Password'></input>
          <br></br><button name='signup' onClick={this.handleSubmit}>Sign Up!</button>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (u) => dispatch({type: "LOGIN", user: u})
  }
}

export default connect(null, mapDispatchToProps)(LoginSignup)
