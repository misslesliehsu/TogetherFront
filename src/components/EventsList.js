import React, { Component } from 'react'
import { connect } from 'react-redux'
import EventListing from './EventListing'



class EventsList extends Component {

  render() {
    return (
      <div className='eventsList'>
        <h2>Your Scheduled Events</h2>
        <br></br>

        {this.props.events.length === 0 && <h3>"No events scheduled yet!"</h3>}

        {this.props.events.map( e => <EventListing key={e.id} e={e} history={this.props.history}></EventListing>)}
      </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.ideas.filter(i => i.scheduled_date !== ''),
  }
}


export default connect(mapStateToProps, null)(EventsList)
