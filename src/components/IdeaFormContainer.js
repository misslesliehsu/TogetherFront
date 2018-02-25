import React, { Component } from 'react'
import IdeaForm from './IdeaForm'
import FriendsList from './FriendsList'
import URL_ROOT from '../URL.js'


export default class IdeaFormContainer extends Component {
  state = {
    user_id: 22,
    invitees: [],
    nonInvitees: []
  }

  componentDidMount() {
    fetch(`${URL_ROOT}users/${this.state.user_id}/friendships`)
    .then(res=> res.json())
    .then(res => this.setState({nonInvitees: [...res]}))
  }

  handleAddInvitee = (friend) => {
    let i = this.state.nonInvitees.findIndex(f => f.id===friend.id)
    const update = this.state.nonInvitees
    update.splice(i, 1)
    this.setState((prevState) => {return {...prevState, nonInvitees: update, invitees: [...prevState.invitees, friend]}})
  }

  handleRemoveInvitee = (friend) => {
    this.setState({nonInvitees: [...this.state.nonInvitees, friend]})
    const i = this.state.invitees.indexOf(friend)
    const update = this.state.invitees
    update.splice(i, 0)
    this.setState({invitees: update })
  }

  render() {
    return (
      <div style={{display:'grid', gridRowColumns:'1fr 1fr'}}>
        <IdeaForm invitees={this.state.invitees} addInvitee={this.handleAddInvitee} removeInvitee={this.handleRemoveInvitee}/>
        <div>
          <h3>Invite Friends</h3>
          <FriendsList friends={this.state.nonInvitees} />
        </div>
      </div>

    )
  }
}
