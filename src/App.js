import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import URL_ROOT from './URL'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`http://localhost:3001/current_user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      }).then(res => res.json())
      .then(res => {
        if (res.user) {
          this.props.login(res.user)
        }
        else {this.props.logout()}
      })
    }
    else {
      this.props.logout()
    }
  }

  render() {
    return (
      <div className="App">
        <Header history={this.props.history}/>
        <Main/>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user_id: state.user.id
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    loadIdeas: (i) => dispatch({type: 'LOAD_IDEAS', ideas: i}),
    loadFriends: (f) => dispatch({type: 'LOAD_FRIENDS', friends: f}),
    loadNonFriends: (nf) => dispatch({type: 'LOAD_NONFRIENDS', nonFriends: nf}),
    login: (u) => dispatch({type: "LOGIN", user: u}),
    logout: () => dispatch({type:'LOGOUT'})
  })

}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
