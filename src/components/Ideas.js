import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import IdeaForm from './IdeaForm'
import IdeaCard from './IdeaCard'

const ideas = () => {
  return (
    <div>
      <h3>Hey I am the ideas triage component! If you only see this, you must be on /ideas/ only, vs. /ideas/#, or /ideas/new, or if you are, you do not have that idea in your state</h3>
      <Switch>
        <Route exact path='/ideas/new' render={ (routeProps) => <IdeaForm edit={false} {...routeProps}/>}/>
        <Route exact path='/ideas/:id' render={ (routeProps) => <IdeaCard edit={false} {...routeProps}/>}/>
        <Route exact path='/ideas/:id/edit' render={ (routeProps) => <IdeaForm edit={true} {...routeProps}/>}/>
      </Switch>
    </div>


  )
}

export default withRouter(ideas)
