import React, { Component } from 'react'
import IdeaForm from './IdeaForm'
import FriendsList from './FriendsList'
import URL_ROOT from '../URL.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class IdeaFormContainer extends Component {
  state = {
    invitees: [],
    idea: {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.ideas !== this.props.ideas
    || nextProps.friends !== this.props.friends
    || nextState.idea !== {} && this.state.idea === {}
    || this.props.invitees !== nextProps.invitees
  }

  componentDidUpdate() {
    if (this.props.edit === true && this.props.ideas[0] !== "start") {
      const ideaToEdit = this.props.ideas.find(i => i.id == this.props.match.params.id)
      this.setState({invitees: ideaToEdit.invitees, idea: ideaToEdit})
    }
  }

  handleAddInvitee = (friend) => {
    this.setState({invitees: [...this.state.invitees, friend]})
  }

  handleRemoveInvitee = (friend) => {
    const i = this.state.invitees.findIndex( f => f.id === friend.id)
    const update = this.state.invitees
    update.splice(i, 1)
    this.setState({invitees: update})
  }

  calcNoninvitees = () => {
    return this.props.friends.filter(f => !this.state.invitees.includes(f))
  }

  render() {
    console.log(this.state)
    return (
      //how come i HAVE to include nonInvitees as props, in order for IdeaForm to re-render?
      <div style={{display:'grid', gridRowColumns:'1fr 1fr'}}>
        <IdeaForm history={this.props.history} invitees={this.state.invitees} addInvitee={this.handleAddInvitee} removeInvitee={this.handleRemoveInvitee} idea={this.state.idea}/>
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
    friends: state.friends,
    ideas: state.ideas
  }
}

export default withRouter(connect(mapStateToProps, null)(IdeaFormContainer))
