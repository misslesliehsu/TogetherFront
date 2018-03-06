import React, { Component } from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import { loadData, login } from '../actions'

class LoginSignup extends Component {

  state = {
    login_email: '',
    login_password:'',
    signup_email: '',
    signup_password: '',
    signup_password_confirmation: '',
    signup_first_name: '',
    signup_last_name:''
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
        localStorage.setItem('token', res.token)
        this.props.loadData(res.user.id)
      })
      .then(this.props.history.push('/dashboard'))
    }
    else {
      if (this.state.signup_password !== this.state.signup_password_confirmation) {
        try {
          throw new Error('Password & Password Confirmation do not match!');
        }
        catch (e) {
          console.log(e.name + ': ' + e.message);
        }
      }
      else {
        fetch(`http://localhost:3001/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              user: {
                email: this.state.signup_email,
                password: this.state.signup_password,
                first_name: this.state.signup_first_name,
                last_name: this.state.signup_last_name
              }
            }
          )
        }).then(res => res.json())
        .then(res => {
          this.props.login(res.user),
          localStorage.setItem('token', res.token),
          this.props.history.push('/dashboard')
        })
      }
    }
  }

  render() {
    return (
      <div>
        <p>Login</p>
          <input type='text' name='login_email' value={this.state.login_email} onChange={this.handleChange} placeholder='Email Address'></input>
          <input type='password' name='login_password' value={this.state.login_password} onChange={this.handleChange} placeholder='Password'></input>
          <br></br><button name='login' onClick={this.handleSubmit}>Login</button>
          <br></br>
          <br></br>
          <br></br>
          <p>Sign Up</p>
          <input type='text' name='signup_email'value={this.state.signup_email} onChange={this.handleChange} placeholder='Email Address'></input>
          <input type='text' name='signup_first_name' value={this.state.signup_first_name} onChange={this.handleChange} placeholder='First Name'></input>
          <input type='text' name='signup_last_name' value={this.state.signup_last_name} onChange={this.handleChange} placeholder='Last Name'></input>
          <input type='password'name='signup_password' value={this.state.signup_password} onChange={this.handleChange} placeholder='Password'></input>
          <input type='password' name='signup_password_confirmation' value={this.state.signup_password_confirmation} onChange={this.handleChange} placeholder='Confirm Password'></input>
          <br></br><button name='signup' onClick={this.handleSubmit}>Sign Up!</button>
      </div>
    )
  }

}

export default connect(null, {login, loadData})(LoginSignup)


//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     login: (u) => dispatch({type: "LOGIN", user: u}),
//     loadData
//   }
// }

// export default connect(null, mapDispatchToProps)(LoginSignup)
