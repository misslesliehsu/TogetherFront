import React from 'react'
import IdeasList from './IdeasList'
import EventsList from './EventsList'


const Dashboard = () => {
  return (
    <div style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}>
      <IdeasList/>
      <EventsList/>
    </div>
  )
}


export default Dashboard
