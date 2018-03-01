import React from 'react'
import { connect } from 'react-redux'

const eventsList = (props) => {
  return (
    <div>
      <p>YOUR SCHEDULED EVENTS</p>
      {props.events.map( e => <li>{e.name}</li>)}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    events: state.ideas.filter(i => i.scheduled_date !== '')
  }
}


export default connect(mapStateToProps, null)(eventsList)
