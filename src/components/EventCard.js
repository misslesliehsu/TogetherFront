import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import DateSuggestionItem from './DateSuggestionItem'
import { CardGroup } from 'semantic-ui-react'

//NEED TO CHECK WHY NOT UPDATED RIGHT AWAY, AFTER EDIT

class eventCard extends Component {

  state = {
    accepted: null
  }

  componentDidMount() {
    if (this.props.user_id != 'start'){
    fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${this.props.user_id}`)
    .then(res => res.json())
    .then(res => {res && this.setState({accepted: res.accepted})})
    }
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.user_id === 'start' && nextProps.user_id != "start" && nextProps.e) {
      fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${nextProps.user_id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({accepted: res.accepted})})
    }
  }

  handleEdit = () => {
    this.props.history.push(`/events/${this.props.match.params.id}/schedule`)
  }

  handleRSVP = (e) => {
    if (e.target.name === 'yes') {
        this.setState({accepted: true}, () => {
          fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${this.props.user_id}`, {
                  method: 'put',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(
                    {
                      response: this.state.accepted
                    }
                  )
                })
          this.props.updateRSVP(this.props.match.params.id, this.state.accepted)
          })
    }
    else {
      this.setState({accepted: false}, () =>     {
        fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${this.props.user_id}`, {
                method: 'put',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                  {
                    response: this.state.accepted
                  }
                )
              })
        this.props.updateRSVP(this.props.match.params.id, this.state.accepted)
        })
    }
  }

  renderRSVPInvitees = () => {
    // debugger
    if (this.props.invitations[0] !== 'start' && this.props.ideas[0] !=='start'){
      let idea = this.props.ideas.filter(i=> i.id == this.props.match.params.id)[0]
      let invitees = idea.invitees
      let yess = []
      let nos = []
      let unknowns = []
      invitees.forEach( person => {
        // debugger
        let correct = this.props.invitations.find( i=> i.invitee_id == person.id)
        if (correct) {
          if (correct.accepted === true) {
            yess.push(person)
          }
          else if (correct.accepted === false) {
            nos.push(person)
          }
          else {
            unknowns.push(person)
          }
        }
      })
      return (
        <div>
          <h1 style={{float:'left', marginTop: '60px', color: 'green'}}>IN {} </h1>
          <div style={{width: '500px', display: 'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
          {yess.length === 0 && <div><br></br><br></br><br></br></div>}
          {yess.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
          </div>

          <h1 style={{float:'left', marginTop: '60px', color: 'red'}}>OUT</h1>
            <div style={{width: '500px', display: 'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
          {nos.length === 0 && <div><br></br><br></br><br></br></div>}
          {nos.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
          </div>

          <h1 style={{float:'left', marginTop: '60px'}}>TBD</h1>
          <div style={{width: '500px', display: 'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'}}>
          {unknowns.length === 0 && <div><br></br><br></br><br></br></div>}
          {unknowns.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
          </div>
        </div>
      )
    }
  }


  setupRSVP = () => {
    switch (this.state.accepted) {
      case null:
        return (
          <div>
            <button className='RSVP' name='yes' onClick={this.handleRSVP}>I'm In!</button>
            <button className='RSVP' name='no' onClick={this.handleRSVP}>I'm Out</button>
          </div>
        )
      case false:
        return (
          <div>
            <button className='RSVP' name='yes' onClick={this.handleRSVP}>I'm In!</button>
            <button className='RSVP Selected' name='no' onClick={this.handleRSVP}>I'm Out</button>
          </div>
        )
      case true:
        return (
          <div>
            <button className='RSVP Selected' name='yes' onClick={this.handleRSVP}>I'm In!</button>
            <button className='RSVP' name='no' onClick={this.handleRSVP}>I'm Out</button>
          </div>
        )
      }
  }


  handleBackToDash = () => {
    this.props.history.push(`/dashboard`)
  }

  //why can't i define eventScheduled outside a function, on its own?
  render() {
    let eventScheduled = this.props.ideas.find( i => i.id == this.props.match.params.id)
    return (
      <div>
        <br></br><br></br>
        <img src={require('../calendar.png')} style={{height: '200px'}}/>
        {eventScheduled &&
          <div className='eventCard'>
            <h1 style={{fontSize: '40px'}}>{eventScheduled.name}</h1>
            <div className='eventData'>
              <ul style={{listStyle: 'none'}}>
                <li>DESCRIPTION: {eventScheduled.description}</li>
                <li>WHERE: {eventScheduled.location}</li>
                <li>DATE: {eventScheduled.scheduled_date}</li>
                <li>INVITED:</li>
                  </ul>
                  <CardGroup>
                    {this.renderRSVPInvitees()}
                  </CardGroup>
            </div>
              <br></br><br></br><br></br>
              {this.props.user_id === eventScheduled.owner_id && <button onClick={this.handleEdit}>Edit Idea</button>}
              <br></br><br></br>
              {this.props.user_id !== eventScheduled.owner_id && this.setupRSVP()}
              <br></br><br></br><br></br>
            <div style={{textDecoration: 'underline', float: 'left'}} onClick={this.handleBackToDash}>Back To Dashboard</div><br></br>
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    ideas: state.ideas,
    invitations: state.invitations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeIdeaFromStore: (i_id) => dispatch({type: 'REMOVE_IDEA_FROM_STORE', idea_id: (i_id)}),
    updateRSVP: (idea_id, response) => dispatch({type: 'UPDATE_RSVP', response, idea_id})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(eventCard)
