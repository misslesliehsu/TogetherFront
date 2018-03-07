import React, { Component } from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import { loadData, login } from '../actions'
import { Image, Button } from 'semantic-ui-react'


class LoginSignup extends Component {

  state = {
    login_email: '',
    login_password:'',
    signup_email: '',
    signup_password: '',
    signup_password_confirmation: '',
    signup_first_name: '',
    signup_last_name:'',
    mode: 'neutral'
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
        if (Object.keys(res).includes('error')) {
          window.alert(res.error)
        }
        else {
          this.props.login(res.user),
          localStorage.setItem('token', res.token)
          this.props.loadData(res.user.id)
          this.props.history.push('/dashboard')
        }
      })
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
  handleClickSetup = () => {
    if (this.state.mode === 'logging in') {
      this.setState({mode: 'signing up'})
    }
    else if (this.state.mode === 'signing up') {
      this.setState({mode: 'logging in'})
    }
  }

  handleClickButton = (e) => {
    this.setState({mode: e.target.name})
  }

  handleSetup = () => {
    if (this.state.mode === 'neutral') {
      return (
      <div>
        <Button size='massive' name='signing up' onClick={this.handleClickButton}>Sign Up</Button>
        <br></br>
        <br></br>
        <Button size='massive' name='logging in' onClick={this.handleClickButton}>Login</Button>
      </div>
      )
    }
    else if (this.state.mode === 'signing up') {
      return (
        <div>
          <input type='text' name='signup_email'value={this.state.signup_email} onChange={this.handleChange} placeholder='Email Address'></input>
          <input type='text' name='signup_first_name' value={this.state.signup_first_name} onChange={this.handleChange} placeholder='First Name'></input>
          <input type='text' name='signup_last_name' value={this.state.signup_last_name} onChange={this.handleChange} placeholder='Last Name'></input>
          <input type='password'name='signup_password' value={this.state.signup_password} onChange={this.handleChange} placeholder='Password'></input>
          <input type='password' name='signup_password_confirmation' value={this.state.signup_password_confirmation} onChange={this.handleChange} placeholder='Confirm Password'></input>
          <br></br><button name='signup' onClick={this.handleSubmit}>Sign Up!</button>
          <p onClick={this.handleClickSetup}>Already Have an Account? Log In</p>
        </div>
      )
    }
    else if (this.state.mode === 'logging in') {
      return (
        <div>
          <input type='text' name='login_email' value={this.state.login_email} onChange={this.handleChange} placeholder='Email Address'></input>
          <input type='password' name='login_password' value={this.state.login_password} onChange={this.handleChange} placeholder='Password'></input>
          <br></br><button name='login' onClick={this.handleSubmit}>Login</button>
          <p onClick={this.handleClickSetup}>Don't Have an Account? Sign Up</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div style={{backgroundColor: '#52afe5'}}>
          <br></br><br></br><br></br>
          <h1>Brainstorm, plan, and schedule events with friends.</h1>
          <br></br><br></br><br></br>


        {this.handleSetup()}
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
