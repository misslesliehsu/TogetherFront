import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import DateSuggestionItem from './DateSuggestionItem'
import { CardGroup } from 'semantic-ui-react'

//NEED TO CHECK WHY NOT UPDATED RIGHT AWAY, AFTER EDIT

class ideaCard extends Component {

  handleCountOut = () => {
    fetch(`${URL_ROOT}invitations/${this.props.match.params.id}/${this.props.user_id}`, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(this.props.removeIdeaFromStore(this.props.match.params.id))
          .then(this.props.history.push(`/dashboard`))
  }

  handleEdit = () => {
    this.props.history.push(`/ideas/${this.props.match.params.id}/edit`)
  }

  handleSchedule = () => {
    this.props.history.push(`/ideas/${this.props.match.params.id}/schedule`)
  }

  handleBackToDash = () => {
    this.props.history.push(`/dashboard`)
  }

  handleInviteeList = () => {
    let getIdea = this.props.ideas.find( i => i.id == this.props.match.params.id)
    let filtered = getIdea.invitees.filter(i => i.id != this.props.user_id)
    return filtered.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)

  }

  handleHostName = () => {
    let getIdea = this.props.ideas.find( i => i.id == this.props.match.params.id)
    let all_people = this.props.nonFriends.concat(this.props.friends)
    if (this.props.user) {
      return (
        getIdea.owner_id == this.props.user_id ?
        "You" : all_people.find(f => f.id == getIdea.owner_id).first_name
      )
    }
  }


  //why can't i define getIdea outside a function, on its own?
  render() {
    console.log(this.props.user)
    let getIdea = this.props.ideas.find( i => i.id == this.props.match.params.id)
    return (
      <div>
        {getIdea &&
          <div className='ideaCard'>
            <img src={require('../blueThought.png')} style={{height: '150px', display:'inline'}}/>
            <h1>{getIdea.name}</h1>
            <div className='ideaData'>
              <ul style={{listStyle: 'none'}}>
                <li>HOSTED BY: {this.handleHostName()}</li>
                <li>DESCRIPTION: {getIdea.description}</li>
                <li>WHERE: {getIdea.location}</li>
                <li>DATE SUGGESTIONS:</li>
                  {getIdea.date_suggestions.length > 0 ?
                    <div style={{marginLeft: '20px'}}>
                      {getIdea.date_suggestions.map(d => <DateSuggestionItem key={d.id} d={d} ideaId={getIdea.id} ownerId={getIdea.owner_id}/>)}
                    </div>
                 :
                 <div style={{fontSize: '20px'}}>There are no date suggestions yet.</div>
                  }
                  <li>INVITED:</li>
              </ul>
                  <CardGroup>
                    {this.handleInviteeList()}
                  </CardGroup>

            </div>
            <br></br><br></br>

              {this.props.user_id === getIdea.owner_id && <button onClick={this.handleEdit}>Edit Idea</button>}
              <br></br><br></br>

              {this.props.user_id === getIdea.owner_id && <button className='scheduleItButton' onClick={this.handleSchedule}>Schedule It!</button>}
              {this.props.user_id !== getIdea.owner_id && <button className='countOutButton' onClick={this.handleCountOut}>Mmm, Count Me Out</button>}

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
    user: state.user,
    friends: state.friends,
    nonFriends: state.nonFriends
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeIdeaFromStore: (i_id) => dispatch({type: 'REMOVE_IDEA_FROM_STORE', idea_id: (i_id)})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ideaCard)
