import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import IdeaFormContainer from './IdeaFormContainer'
import IdeaCard from './IdeaCard'

const ideas = () => {
  return (
    <div>
      <h3>Hey I am the ideas triage component! If you only see this, you must be on /ideas/ only, vs. /ideas/#, or /ideas/new, or if you are, you do not have that idea in your state</h3>
      <Switch>
        <Route exact path='/ideas/new' component={IdeaFormContainer}/>
        <Route exact path='/ideas/:id' component={IdeaCard}/>
        <Route exact path='/ideas/:id/edit' render={ (routeProps) => <IdeaFormContainer edit={true}/>}/>
      </Switch>
    </div>


  )
}

export default withRouter(ideas)


//THE QUESTION IS --- How do I set the "selected Idea" in the state?  Do i do it based on when that specific idea is rendered - i.e. have the IdeaItem itself set it? (But then, when?)  Or should it be set by other components upon trying to navigate to the specific Idea.  (But then - what happens when someone goes straight there?)
