import React, { Component } from 'react'
import { connect } from 'react-redux'
import FriendItem from './FriendItem'
import URL_ROOT from '../URL.js'

// const x = 4
class IdeaForm extends Component {

  state = {
      name: '',
      location: '',
      owner_id: 22,
      description: '',
      dateSuggestions: [Date.now()]
  }


  handleChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}
    )
  }

  handleSave = (e) => {
    e.preventDefault()
    this.props.addIdea(this.state)
    fetch(`${URL_ROOT}ideas/`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              idea:{
                name: this.state.name,
                location: this.state.location,
                owner_id: this.state.owner_id,
                description: this.state.description
              },
              dateSuggestions: this.state.dateSuggestions,
              invitees: this.props.invitees
            }
          )
        }).then(res=> res.json())
        .then(res=>console.log(res)) // what do i do with the errors here
  }

  handleSetDate = (e) => {
    let i = parseInt(e.target.name, 10)
    let dateSuggestions = this.state.dateSuggestions
    dateSuggestions[i] = e.target.value
    this.setState({dateSuggestions})
  }


  handleAddDate = () => {
    this.setState({dateSuggestions: [...this.state.dateSuggestions, Date.now()]})
  }

  handleDrop = (e) => {
    const invitee = JSON.parse(e.dataTransfer.getData('friend'))
    this.props.addInvitee(invitee)
  }

  dragOver = (e) => {
    e.preventDefault()
  }

  dragEnd = (e) => {
    e.preventDefault()
  }

  renderSuggestions = () => {
    let suggestions = []
    for (let i = 0; i < this.state.dateSuggestions.length; i++) {
      suggestions.push(<input type='date' key={i} onChange={this.handleSetDate} name={i} value={this.state.dateSuggestions[i]}></input>)
    }
    return (suggestions)
  }


  render() {
    return(
      <div className='ideaForm' draggable='true' onDrop={this.handleDrop} onDragOver={this.dragOver} onDragEnd={this.dragEnd}>
        <div>
          <form >
            <input type='text' name='name' placeholder='Idea Name' value={this.state.name} onChange={this.handleChange}></input>
            <br></br>
            <input type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.handleChange}></input>
            <br></br>
            <input type='textArea' name='description' placeholder='Description' value={this.state.description} onChange={this.handleChange}></input>
            <br></br>
          </form>
          <div>
              {this.renderSuggestions()}
          </div>
          <button onClick={this.handleAddDate}>Add Another Date Option</button>
        </div>
        <div>
          Friends:
        {this.props.invitees.map( i => <FriendItem key={i.i} friend={i}/>)}
        </div>
        <button onClick={this.handleSave}>Plant The Seed</button>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({addIdea: (i) => dispatch({type: 'ADD_IDEA', ideaWithDates: i})})
}


export default connect(null, mapDispatchToProps)(IdeaForm)
