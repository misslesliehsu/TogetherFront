import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'

class DateSuggestionItem extends Component {


//if this person votes, then you fetch POST to the date suggestion with the current user (from store) - also reverse the button
  handleVoteOrUnvote = () => {

    // if this person is already in voters:
    fetch(`${URL_ROOT}ideas/${this.props.ideaId}/date_suggestions/${this.props.d.id}/votes`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              user_id: this.props.user_id
            }
          )
        }).then(res=> res.json())
        .then(console.log)
        .then()

    //otherwise, delete the vote with a fetch delete

  }

  // const buttonText = () => {
  //   //is the current user in the date suggestions voters or no
  // }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.d.date}
        {this.props.d.voters.map( v => <li>{v.first_name} {v.last_name}</li>)}
        <button onClick={this.handleVoteOrUnvote}>button here!</button>
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {user_id: state.user_id}
}

export default connect(mapStateToProps, null)(DateSuggestionItem)
