import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import IdeaForm from './IdeaForm'

class Main extends Component {

  render() {
    return(
      <Switch>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/ideas/new' component={IdeaForm}/>
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
