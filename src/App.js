import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import URL_ROOT from './URL'
import { connect } from 'react-redux'



class App extends Component {

  //loading database Ideas (owned & invited), Friends, (and later Events) to the store state

  componentDidMount() {
    if (this.props.user_id) {
      console.log("starting fetch from App.js")
      fetch(`${URL_ROOT}users/${this.props.user_id}/ideas`)
      .then(res => res.json())
      .then(res => res.forEach(r => this.props.addIdea(r)))

      fetch(`${URL_ROOT}users/${this.props.user_id}/friendships`)
      .then(res=> res.json())
      .then(res => res.forEach(r => this.props.addFriend(r)))
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
    addIdea: (i) => dispatch({type: 'ADD_IDEA', idea: i}),
    addFriend: (f) => dispatch({type: 'ADD_FRIEND', friend: f})
  })

}



export default connect(mapStateToProps, mapDispatchToProps)(App)
