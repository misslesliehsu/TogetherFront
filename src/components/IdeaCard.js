import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import DateSuggestionItem from './DateSuggestionItem'


class ideaCard extends Component {

    //WILL NEED TO STORE USER HERE

  render() {
    const getIdea = this.props.ideas.find( i => i.id == this.props.match.params.id)
    console.log(this.props)
    return (
      <div>
        {getIdea &&
          <div className='ideaCard'>
            <h2>{getIdea.name}</h2>
            <ul style={{listStyle: 'none'}}>
              <li>Where: {getIdea.location}</li>
              <li>Description: {getIdea.description}</li>
              <li>Friends:</li>
                {getIdea.invitees.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
              {getIdea.date_suggestions.map(d => <DateSuggestionItem key={d.id} d={d} ideaId={getIdea.id}/>)}
              {this.props.user_id === getIdea.owner_id && <button>Edit Idea</button>}
              {this.props.user_id !== getIdea.owner_id && <button>Count Me Out</button>}
            </ul>

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


export default connect(mapStateToProps, null)(ideaCard)
