import React, { Component } from 'react'
import IdeasList from './IdeasList'
import EventsList from './EventsList'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import URL_ROOT from '../URL'


class Dashboard extends Component {

  //loading database Ideas (owned & invited), Friends, (and later Events) to the store state

  render() {
    return (
      <div style={{display:'grid', gridTemplateColumns:'2fr 1fr'}}>
        <IdeasList history={this.props.history}/>
        <EventsList/>
      </div>
    )
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
    loadNonFriends: (nf) => dispatch({type: 'LOAD_NONFRIENDS', nonFriends: nf})
  })

}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
