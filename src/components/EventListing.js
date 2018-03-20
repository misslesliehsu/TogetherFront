import React, { Component } from 'react'
import { connect } from 'react-redux'
import URL_ROOT from '../URL'

class EventListing extends Component {


  handleEventClick = (e) => {
    if (e.target.id != 'removeListing') {
      this.props.history.push(`/events/${this.props.e.id}`)
    }
  }


  handleRemoveListing = () => {
    const invite = this.props.invitations.find( i => i.idea_id == this.props.e.id)
    fetch(`${URL_ROOT}invitations/${this.props.e.id}/${this.props.user_id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(this.props.removeIdeaFromStore(this.props.e.id))
          .then(this.props.removeInvitationFromStore(invite.id))
  }


  calcRSVP = () => {
    if (this.props.invitations) {
      if (this.props.invitations[0] !== 'start' && this.props.e !=='start') {
    const invite = this.props.invitations.find( i => i.idea_id == this.props.e.id)
      // debugger
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
              <button id="removeListing" className='XEventListing' onClick={this.handleRemoveListing}>X</button>
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
        <div className='eventListArea' onClick={this.handleEventClick} style={{display:'grid', gridTemplateColumns:'1fr 1fr 4fr 1fr'}}>
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

const mapDispatchToProps = (dispatch) => {
  return {
    removeIdeaFromStore: (i_id) => dispatch({type: 'REMOVE_IDEA_FROM_STORE', idea_id: (i_id)}),
    removeInvitationFromStore: (invite_id) => dispatch({type: 'REMOVE_INVITATION_FROM_STORE', invite_id: (invite_id)})
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(EventListing)
