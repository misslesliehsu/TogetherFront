import React, { Component } from 'react'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import URL_ROOT from '../URL.js'
import { withRouter } from 'react-router-dom'
import { Card } from 'semantic-ui-react'

class IdeaForm extends Component {

  state = {
      name: '',
      location: '',
      description: '',
      date_suggestions: [{date: '', id: null, voters: [] }],
      invitees: [],
      owner_id: '',
      scheduled_date: ''
  }


  //for existing ideas; clicked 'edit' from show page
  componentDidMount() {
    if (this.props.purpose === 'edit' && this.props.ideas[0] !== "start") {
      const ideaToEdit = this.props.ideas.find(i => i.id == this.props.match.params.id)
      this.setState(ideaToEdit)
    }
  }

  //for existing ideas; navigated directly to edit page (i.e. maybe no props avail yet)
  componentWillReceiveProps(nextProps) {
    if (this.props.purpose === 'edit' && nextProps.ideas[0] !== "start") {
      const ideaToEdit = nextProps.ideas.find(i => i.id == this.props.match.params.id)
      this.setState(ideaToEdit)
    }
  }
  //NOTES: I had to use both componentWillReceiveProps and componentDidMount because 1) used componentWillReceiveProps to indicate a direct attempt to visit the edit page for an existing item.  in this case, the store ideas may not be available to the component yet, as props, during componentDidMount - therefore need to catch when they DO come down the pike, and are complete (i.e. have ideas that are not in initial state 'start').  2) used componentDidMount for cases when someone is on Show page, then clicks 'edit'.  in this case, the props are already there -- no new influx will trigger a componentWillReceiveProps - thus state should be set during mount, with the ideas which are already available as props

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

  handleChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}
    )
  }
  handleDelete = () => {
    fetch(`${URL_ROOT}users/${this.props.user_id}/ideas/${this.props.match.params.id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(this.props.removeIdea(this.props.match.params.id))
    .then(this.props.history.push('/dashboard'))
  }

  handleSave = (e) => {
    e.preventDefault()

    //for brand new ideas
    if (this.props.purpose === 'new') {
      fetch(`${URL_ROOT}users/${this.props.user_id}/ideas`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                idea:{
                  name: this.state.name,
                  location: this.state.location,
                  owner_id: this.props.user_id,
                  description: this.state.description,
                  scheduled_date: this.state.scheduled_date
                },
                date_suggestions: this.state.date_suggestions,
                invitees: this.state.invitees
              }
            )
          }).then(res=> res.json())
          .then(res => {
            var updatedDS = this.state.date_suggestions.filter(ds => ds.date !== "")
            this.setState({date_suggestions: updatedDS})
            this.props.addIdea({...this.state, owner_id: this.props.user_id, id: res}); return res})
          .then(res=>this.props.history.push(`/ideas/${res}`)) //note << what you get back (res) is just the idea.id
    }

    //for editing existing ideas
    else {
      fetch(`${URL_ROOT}users/${this.props.user_id}/ideas/${this.props.match.params.id}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                idea:{
                  name: this.state.name,
                  location: this.state.location,
                  owner_id: this.state.user_id,
                  description: this.state.description
                },
                date_suggestions: this.state.date_suggestions,
                invitees: this.state.invitees,
                scheduled_date: this.state.scheduled_date
              }
            )
          }).then(res=> res.json())
          .then(res => {
            var updatedDS = this.state.date_suggestions.filter(ds => ds.date !== "")
            this.setState({date_suggestions: updatedDS})
            this.props.updateIdea({...this.state, id: this.props.match.params.id}); return res})
          .then(res=>this.props.history.push(`/ideas/${this.props.match.params.id}`))
    }
  }
  // what do i do with the errors here - should not save & should not go to show page


  handleSetDate = (e) => {
    let i = parseInt(e.target.name, 10)
    let date_suggestions = this.state.date_suggestions
    date_suggestions[i] = {date: e.target.value, voters: [], id: null}
    this.setState({date_suggestions})
  }


  handleAddDate = () => {
    this.setState({date_suggestions: [...this.state.date_suggestions, {date: '', id: null, voters: [] }]})
  }

  handleDrop = (e) => {
    const invitee = JSON.parse(e.dataTransfer.getData('friend'))
    this.props.addInvitee(invitee)
  }

  handleRemoveDate = (e) => {
    //remove this from the date suggestions array
    const updated = this.state.date_suggestions
    updated.splice(e.target.name, 1)
    this.setState({date_suggestions: updated})
  }

  dragOver = (e) => {
    e.preventDefault()
  }

  dragEnd = (e) => {
    e.preventDefault()
  }

  renderSuggestions = () => {
    let suggestions = []
    for (let i = 0; i < this.state.date_suggestions.length; i++) {
      suggestions.push(
        <div key={i}>
          <input className='dateInputField' type='date' key={i} onChange={this.handleSetDate} name={i} value={this.state.date_suggestions[i].date}></input>
          <button name={i} onClick={this.handleRemoveDate}>X</button>
          <br></br>
        </div>
      )
    }
    return (suggestions)
  }


  render() {
    return(
      <div>
        <div className='ideaForm' draggable='true' onDrop={this.handleDrop} onDragOver={this.dragOver} onDragEnd={this.dragEnd}>
          DEETS, PLEASE
          <br></br><br></br>
          <form className='ideaFormForm'>
            Name:
            <input type='text' name='name' value={this.state.name} onChange={this.handleChange}></input>
            <br></br><br></br>
            Description: <input type='textArea' name='description'value={this.state.description} onChange={this.handleChange}></input>
            <br></br><br></br>
            Location: <input type='text' name='location' value={this.state.location} onChange={this.handleChange}></input>
            <br></br><br></br>
          </form>
          <div>Date Suggestions: <button style={{fontSize:'20px'}} onClick={this.handleAddDate}>Add Another Date Option</button></div>
              {this.renderSuggestions()}
          <br></br>
          <hr></hr>
          Invited:
          <br></br><br></br>

            <Card.Group>
        {this.state.invitees.map( i => <FriendItem buttonAction={this.handleRemoveInvitee} key={i.id} friend={i}/>)}
      </Card.Group>

        <br></br>
          <hr></hr>

        <button style={{marginTop: '50px'}} onClick={this.handleSave}>Save Idea</button><br></br>
        <h3 style={{fontSize:'20px', textDecoration:'underline'}} onClick={this.handleDelete}>Delete Idea</h3>
        </div>
        <div className='addMoreFriends'>
          <h1>Invite More Friends</h1>
            <Card.Group>
              {this.calcNoninvitees().map( nI => <FriendItem key={nI.id} buttonAction={this.handleAddInvitee} friend={nI}/>)}
            </Card.Group>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    addIdea: (i) => dispatch({type: 'ADD_IDEA', idea: i}),
    updateIdea: (i) => dispatch({type: 'UPDATE_IDEA', idea: i}),
    removeIdea: (id) => dispatch({type:'REMOVE_IDEA_FROM_STORE', idea_id: id})
  })
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.id,
    friends: state.friends,
    ideas: state.ideas
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IdeaForm))
