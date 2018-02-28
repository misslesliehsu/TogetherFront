import React, { Component } from 'react'
import IdeaForm from './IdeaForm'
import FriendsList from './FriendsList'
import URL_ROOT from '../URL.js'
import { connect } from 'react-redux'

class IdeaFormContainer extends Component {
  state = {
    invitees: [],
    nonInvitees: [],
    idea: null
  }

  //I THINK TEH BELOW ONLY HAPPENS ONCE WHEN IT NEEDS TO HAPPEN EVERY TIME
  componentDidMount() {
    this.setState({nonInvitees: this.props.friends})
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

  calcNoninvitees = () => {
    return this.props.friends.filter(f => !this.state.invitees.includes(f))
  }


  render() {
    return (
      //how come i HAVE to include nonInvitees as props, in order for IdeaForm to re-render?
      <div style={{display:'grid', gridRowColumns:'1fr 1fr'}}>
        <IdeaForm history={this.props.history} invitees={this.state.invitees} addInvitee={this.handleAddInvitee} removeInvitee={this.handleRemoveInvitee}/>
        <div>
          <h4>Invite Friends</h4>
          <FriendsList buttonAction={this.handleAddInvitee} friends={this.calcNoninvitees()} />
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends
  }
}

export default connect(mapStateToProps, null)(IdeaFormContainer)
