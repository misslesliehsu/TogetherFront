import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdeaFormContainer from './IdeaFormContainer'
import IdeaCard from './IdeaCard'

const ideas = () => {
  return (
    <div>
      <h3>Hey I am the ideas triage component!</h3>
      <Switch>
        <Route exact path='/ideas/new' component={IdeaFormContainer}/>
        <Route path='/ideas/:id' component={IdeaCard}/>
      </Switch>
    </div>


  )
}

export default ideas


//THE QUESTION IS --- How do I set the "selected Idea" in the state?  Do i do it based on when that specific idea is rendered - i.e. have the IdeaItem itself set it? (But then, when?)  Or should it be set by other components upon trying to navigate to the specific Idea.  (But then - what happens when someone goes straight there?)
