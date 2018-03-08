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

      {props.events.length === 0 && <h3>"No events scheduled yet!"</h3>}

      {props.events.map( e =>
        <div onClick={handleEventClick} key={e.id} id={e.id} style={{display:'grid', gridTemplateColumns:'1fr 1fr 3fr'}}>
          <div>
            <img src={require('../calendar.png')} style={{height: '40px'}}/>
          </div>
          <div style={{margin: 'auto'}}>
            {e.scheduled_date}
          </div>
          <div className='eventCaption'>
            {e.name}
          </div>
          <span><hr></hr></span>
          <span><hr></hr></span>
          <span><hr></hr></span>
        </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.ideas.filter(i => i.scheduled_date !== '')
  }
}


export default connect(mapStateToProps, null)(eventsList)
