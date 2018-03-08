import React, { Component } from 'react'
import { connect } from 'react-redux'

class EventListing extends Component {


  handleEventClick = () => {
    this.props.history.push(`/events/${this.props.e.id}`)
  }


  calcRSVP = () => {
    if (this.props.invitations) {
      if (this.props.invitations[0] !== 'start' && this.props.e !=='start') {
    const invite = this.props.invitations.find( i => i.idea_id == this.props.e.id)
      switch (invite.accepted) {
        case true:
          return (
            <button className="RSVPbuttonIn">
              IN
            </button>
            )
        case false:
          return (
            <div>
              <button className="RSVPbuttonOut">
                OUT
              </button>
              <button className='XEventListing'>X</button>
            </div>
            )
        case null:
          if (this.props.e.owner_id == this.props.user_id) {
            return (
              <img className='eventListingStar' src={require ('../star.png')}></img>
            )
          }
          else {
            return (
              <button className="RSVPbutton">
                RSVP
              </button>
            )
          }
        default:
          return (<div></div>)
      }
      }
    }
    else {
      return <div></div>
    }
  }

  shortenedDate = () => {
    if (this.props.e.scheduled_date) {
      const x = this.props.e.scheduled_date.slice(5)
      if (x[0] == '0') {
        const y = x.slice(1)
        return y
      }
      else {
      return x
      }
    }
    else { }
  }


    render() {
      return (
        <div onClick={this.handleEventClick} style={{display:'grid', gridTemplateColumns:'1fr 1fr 4fr 1fr'}}>
          <div>
            <img src={require('../calendar.png')} style={{height: '40px'}}/>
          </div>
          <div style={{margin: 'auto'}}>
            {this.shortenedDate()}
          </div>
          <div className='eventCaption'>
            {this.props.e.name}
          </div>
          <div>
            {this.calcRSVP()}
          </div>
          <span><hr></hr></span>
          <span><hr></hr></span>
          <span><hr></hr></span>
        </div>
      )
    }
}


const mapStateToProps = (state) => {
  return {
    invitations: state.invitations,
    user_id: state.user.id
  }
}


export default connect(mapStateToProps, null)(EventListing)
