import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import DateSuggestionItem from './DateSuggestionItem'
import { CardGroup } from 'semantic-ui-react'

//NEED TO CHECK WHY NOT UPDATED RIGHT AWAY, AFTER EDIT

class eventCard extends Component {

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
                  <CardGroup>
                    {eventScheduled.invitees.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
                  </CardGroup>

            </div>
            <br></br><br></br>

              {this.props.user_id === eventScheduled.owner_id && <button onClick={this.handleEdit}>Edit Idea</button>}
              <br></br><br></br>

              {this.props.user_id === eventScheduled.owner_id && <button className='scheduleItButton' onClick={this.handleSchedule}>Schedule It!</button>}
              {this.props.user_id !== eventScheduled.owner_id && <button className='countOutButton' onClick={this.handleCountOut}>Count Me Out</button>}

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
    ideas: state.ideas
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeIdeaFromStore: (i_id) => dispatch({type: 'REMOVE_IDEA_FROM_STORE', idea_id: (i_id)})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(eventCard)
