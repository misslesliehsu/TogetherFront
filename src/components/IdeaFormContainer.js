import React, { Component } from 'react'
import IdeaForm from './IdeaForm'
import FriendsList from './FriendsList'
import URL_ROOT from '../URL.js'

export default class IdeaFormContainer extends Component {
  state = {
    user_id: 22,
    invitees: [],
    nonInvitees: [],
    idea: null
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
    const i = this.state.invitees.findIndex( f => f.id === friend.id)
    const update = this.state.invitees
    update.splice(i, 1)
    this.setState((prevState) => {return {...prevState, invitees: update, nonInvitees: [...prevState.nonInvitees, friend]}})
  }


  render() {
    console.log(this.state.invitees, this.state.nonInvitees)
    return (
      //how come i HAVE to include nonInvitees as props, in order for IdeaForm to re-render?
      <div style={{display:'grid', gridRowColumns:'1fr 1fr'}}>
        <IdeaForm history={this.props.history} invitees={this.state.invitees} addInvitee={this.handleAddInvitee} removeInvitee={this.handleRemoveInvitee}/>
        <div>
          <h4>Invite Friends</h4>
          <FriendsList buttonAction={this.handleAddInvitee} friends={this.state.nonInvitees} />
        </div>
      </div>

    )
  }
}
