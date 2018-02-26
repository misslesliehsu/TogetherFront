import React from 'react'
import { Switch, Route } from 'react-router-dom'
import IdeaFormContainer from './IdeaFormContainer'
import IdeaCard from './IdeaCard'

const ideaSection = () => {
  return (
    <Switch>
      <Route exact path='/ideas/new' component={IdeaFormContainer}/>
      <Route path='/ideas/:id' component={IdeaCard}/>
    </Switch>
  )
}

export default ideaSection
