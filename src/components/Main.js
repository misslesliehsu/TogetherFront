import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import IdeaFormContainer from './IdeaFormContainer'

class Main extends Component {

  render() {
    return(
      <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/ideas/new' component={IdeaFormContainer}/>
      </Switch>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    ideas: state.ideas,
    friends: state.friends
  }
}


export default connect(mapStateToProps, null)(Main)
