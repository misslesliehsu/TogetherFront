import React, {Component} from 'react'
import URL_ROOT from '../URL'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import DateSuggestionItem from './DateSuggestionItem'

class ideaCard extends Component {

  state = {
    idea: {},
    dateSuggestions: [],
    invitees: [],
  }

//the function is here to vote - then the fetch goes here too, and updates the votes

//SHOULD NOT NEED THIS
  componentDidMount() {
    fetch(`${URL_ROOT}/ideas/${this.props.match.params.id}`)
    .then(res=>res.json())
    .then(res=>this.setState({idea: res.idea, dateSuggestions: res.dateSuggestions, invitees: res.invitees}))
  }

  // <img className='ideaCardImage' src={require('../plantSeed.jpg')}></img>
  //WILL NEED TO STORE USER HERE

  render() {
    const {name, owner_id, location, description, id} = this.state.idea
    return (
      <div className='ideaCard'>
        <h2>{name}</h2>
        <ul style={{listStyle: 'none'}}>
          <li>Where: {location}</li>
          <li>Description: {description}</li>
          <li>Friends:</li>
            {this.state.invitees.map( f => <FriendItem key={f.id} buttonAction='' friend={f}/>)}
        </ul>
        {this.state.dateSuggestions.map (d => <DateSuggestionItem key={d.id} d={d} ideaId={id}/>)}
        {this.props.user_id === owner_id && <button>Edit Idea</button>}
        {this.props.user_id !== owner_id && <button>Count Me Out</button>}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {user_id: state.user_id}
}

export default connect(mapStateToProps, null)(ideaCard)
