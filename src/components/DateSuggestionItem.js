import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'

class DateSuggestionItem extends Component {

//if this person votes, then you fetch POST to the date suggestion with the current user (from store) - also reverse the button
  handleVoteOrUnvote = () => {
    const {voters, id} = this.props.d
    const {user_id, ideaId} = this.props
    // if this person delete the vote with a fetch delete
    if (voters.some( v => v.id == user_id)) {
      fetch(`${URL_ROOT}votes/${id}/${user_id}`, {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(console.log)
    }
    else {
      //otherwise, add them as a voter
      fetch(`${URL_ROOT}votes/${id}/${user_id}`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            )
          }).then(res=> res.json())
          .then(console.log)
    }

  }

  // const buttonText = () => {
  //   //is the current user in the date suggestions voters or no
  // }

  render() {
    console.log(this.props.d)
    return (
      <div>
        {this.props.d.date}
        {this.props.d.voters.map( v => <li key={v.id}>{v.first_name} {v.last_name}</li>)}
        <button onClick={this.handleVoteOrUnvote}>button here!</button>
      </div>
    )
  }

}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addVote: (i_id, ds_id) => dispatch({type: 'ADD_VOTE', i_id, ds_id, u_id})
//     removeVote: (i_id, ds_id) => dispatch({type: 'REMOVE_VOTE', i_id, ds_id, u_id})
//   }
// }


const mapStateToProps = (state) => {
  return {user_id: state.user.id}
}

export default connect(mapStateToProps, null)(DateSuggestionItem)
