import React from 'react'
import { connect } from 'react-redux'
import EventListing from './EventListing'

const eventsList = (props) => {

  const handleEventClick = (e) => {
    props.history.push(`/events/${e.currentTarget.id}`)
  }

  return (
    <div className='eventsList'>
      <h2>Your Scheduled Events</h2>
      <br></br>

      {props.events.length === 0 && <h3>"No events scheduled yet!"</h3>}

      {props.events.map( e =>
        <EventListing e={e}/>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.ideas.filter(i => i.scheduled_date !== '')
  }
}


export default connect(mapStateToProps, null)(eventsList)
