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

  // componentDidMount() {
  //   if (this.props.user_id != 'start'){
  //   fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${this.props.user_id}`)
  //   .then(res => res.json())
  //   .then(console.log)
  //   // .then(res => this.setState({accepted: res}))
  //   }
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.user_id === 'start' && nextProps.user_id != "start") {
  //     fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${nextProps.user_id}`)
  //     .then(res => res.json())
  //     .then(res => {
  //       this.setState({accepted: res.accepted})})
  //   }
  // }

  handleEdit = () => {
    this.props.history.push(`/events/${this.props.match.params.id}/schedule`)
  }

  showRSVPs = () => {
    const invites = this.props.invitations.filter(i => i.idea_id == this.props.match.params.id)
    const yes = invites.filter(i => i.accepted == true)
    const no = invites.filter(i=> i.accepted == false)
    const tbd = invites.filter(i => !yes.includes(i) && !no.includes(i))
    const yes_people = yes.map(y => this.props.friends.find(x => x.id == y.invitee_id))
    const no_people = no.map(n => this.props.friends.find(x=> x.id == n.invitee_id))
    const tbd_people = tbd.map(t => this.props.friends.find(x => x.id == t.invitee_id))

    return (
      <div>
        <h1 style={{float:'left', color: 'green'}}>IN</h1>
          <CardGroup>
            {yes_people.map( x => <FriendItem friend={x}/>)}
          </CardGroup>
          <br></br>
        <h1 style={{float:'left', color: 'red'}}>OUT</h1>
          <CardGroup>
            {no_people.map( x => <FriendItem friend={x}/>)}
        </CardGroup>
        <br></br>
        <h1 style={{float:'left'}}>TBD</h1>
          <CardGroup>
            {tbd_people.map( x => <FriendItem friend={x}/>)}
          </CardGroup>
          <br></br>
      </div>
    )
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
        })
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
            </div>
              <br></br><br></br>
              {this.props.user_id === eventScheduled.owner_id && this.showRSVPs()}
              <br></br><br></br>
              {this.props.user_id === eventScheduled.owner_id && <button onClick={this.handleEdit}>Edit Idea</button>}
              <br></br><br></br>
              RSVP:
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
    invitations: state.invitations,
    friends: state.friends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeIdeaFromStore: (i_id) => dispatch({type: 'REMOVE_IDEA_FROM_STORE', idea_id: (i_id)})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(eventCard)
