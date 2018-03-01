import React, { Component } from 'react'
import FriendItem from './FriendItem'
import { connect } from 'react-redux'
import URL_ROOT from '../URL'


class FriendsPage extends Component {

  state = {
    input: '',
    results: []
  }

  handleRemoveFriend = (f) => {
    fetch(`${URL_ROOT}friendships/${this.props.user_id}/${f.id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(this.props.removeFriend(f))
  }

  handleAddFriend = (f) => {
    fetch(`${URL_ROOT}users/${this.props.user_id}/friendships`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            friend_id: f.id
          })
        }).then(this.props.addFriend(f))
  }


  handleChange = (e) => {
    this.setState({input: e.target.value}, () => this.setState({results: this.props.nonFriends.filter(nF => nF.first_name.includes(this.state.input) || nF.last_name.includes(this.state.input))}))
  }

  render() {
    return (
      <div>
        FRIENDS HERE!
        {this.props.friends && this.props.friends.map(f => <FriendItem key={f.id} buttonAction={this.handleRemoveFriend} friend={f}/>)}

        Search for more Friends:
        <input type='text' value={this.props.input} onChange={this.handleChange} placeholder='Search for more Friends'></input>

         {this.state.input && this.state.results.map(f => <FriendItem key={f.id} buttonAction={this.handleAddFriend} friend={f}/>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends, nonFriends: state.nonFriends,
    user_id: state.user.id 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFriend: (f) => dispatch({type: 'ADD_FRIEND', friend: f}),
    removeFriend: (f) => dispatch({type: 'REMOVE_FRIEND', friend: f})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage)
