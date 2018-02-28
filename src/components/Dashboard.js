import React from 'react'
import IdeasList from './IdeasList'
import EventsList from './EventsList'
import { Route } from 'react-router-dom'


const Dashboard = (props) => {
  return (
    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr'}}>
      <IdeasList history={props.history}/>
      <EventsList/>
    </div>
  )
}


export default Dashboard
