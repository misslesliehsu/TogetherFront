import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import DateSuggestionItem from './DateSuggestionItem'

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

  //why can't i define getIdea outside a function, on its own?
  render() {
    let getIdea = this.props.ideas.find( i => i.id == this.props.match.params.id)
    return (
      <div>
        {getIdea &&
          <div className='ideaCard'>
            <h1>{getIdea.name}</h1>
            <div className='ideaData'>
              <ul style={{listStyle: 'none'}}>
                <li>WHERE: {getIdea.location}</li>
                <li>DESCRIPTION: {getIdea.description}</li>
                <li>FRIENDS:</li>
                  {getIdea.invitees.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
                <li>DATE SUGGESTIONS:</li>
                  {getIdea.date_suggestions.length > 0 ?
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    {getIdea.date_suggestions.map(d => <DateSuggestionItem key={d.id} d={d} ideaId={getIdea.id} ownerId={getIdea.owner_id}/>)}
                    </div>
                 :
                 <div>There are no date suggestions yet.</div>
                  }
                </ul>
            </div>

              {this.props.user_id === getIdea.owner_id && <button onClick={this.handleEdit}>Edit Idea</button>}
              <br></br>
              {this.props.user_id === getIdea.owner_id && <button onClick={this.handleSchedule}>Schedule It!</button>}
              {this.props.user_id !== getIdea.owner_id && <button className='countOutButton' onClick={this.handleCountOut}>Count Me Out</button>}
          </div>
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    ideas: state.ideas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeIdeaFromStore: (i_id) => dispatch({type: 'REMOVE_IDEA_FROM_STORE', idea_id: (i_id)})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ideaCard)
