import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import IdeaForm from './IdeaForm'
import IdeaCard from './IdeaCard'

const ideas = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/ideas/new' render={ (routeProps) => <IdeaForm edit={false} {...routeProps}/>}/>
        <Route exact path='/ideas/:id' render={ (routeProps) => <IdeaCard edit={false} {...routeProps}/>}/>
        <Route exact path='/ideas/:id/edit' render={ (routeProps) => <IdeaForm edit={true} {...routeProps}/>}/>
      </Switch>
    </div>


  )
}

export default withRouter(ideas)
