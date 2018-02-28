import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import URL_ROOT from './URL'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class App extends Component {

  //loading database Ideas (owned & invited), Friends, (and later Events) to the store state

  componentDidMount() {
    if (this.props.user_id) {
      fetch(`${URL_ROOT}users/${this.props.user_id}/ideas`)
      .then(res => res.json())
      .then(res => this.props.loadIdeas(res))

      fetch(`${URL_ROOT}users/${this.props.user_id}/friendships`)
      .then(res=> res.json())
      .then(res => this.props.loadFriends(res))
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
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
    loadFriends: (f) => dispatch({type: 'LOAD_FRIENDS', friends: f})
  })

}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
