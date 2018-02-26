import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import URL_ROOT from './URL'
import { connect } from 'react-redux'



class App extends Component {

  componentDidMount() {
    if (this.props.user_id) {
      console.log("starting fetch")
      fetch(`${URL_ROOT}users/${this.props.user_id}/ideas`)
      .then(res => res.json())
      .then(console.log)
        // .then(res => res.forEach(r => this.props.addIdea(r)))
    }
    //fetch events, fetch friends
  }


  render() {
    return (
      <div className="App">
      {/* <Header/>
        <Main/>*/}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user_id: state.user_id,
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({addIdea: (i) => dispatch({type: 'ADD_IDEA', ideaWithDates: i})})
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
