import React from 'react'
import { connect } from 'react-redux'

const eventsList = (props) => {

  const handleEventClick = (e) => {
    props.history.push(`/events/${e.currentTarget.id}`)
  }

  return (
    <div className='eventsList'>
      <h2>Your Scheduled Events</h2>
      <br></br>
      {props.events.map( e =>
        <div onClick={handleEventClick} key={e.id} id={e.id} style={{display:'grid', gridTemplateColumns:'1fr 3fr'}}>
          <div>
            {e.scheduled_date}
          </div>
          <div>
            {e.name}
            <hr></hr>
          </div>
          <hr></hr>
        </div>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.ideas.filter(i => i.scheduled_date !== '')
  }
}


export default connect(mapStateToProps, null)(eventsList)
