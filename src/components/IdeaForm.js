import React, { Component } from 'react'
import { connect } from 'react-redux'

class IdeaForm extends Component {

  state = {
    name: '',
    location: '',
    owner: '',
    description: '',
    dateSuggestions: []
  }

  handleChange = (e) => {
    this.setState(
      [e.target.name] = e.target.value
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <input type='text' name='name' placeholder='Idea Name' value={this.state.name} onChange={this.handleChange}></input>
        <input type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.handleChange}></input>
        <input type='textArea' name='description' placeholder='Description' value={this.state.description} onChange={this.handleChange}></input>
        <input type='date'></input>
        <input type='submit'></input>
      </form>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  dispatch({type: 'ADD_IDEA', idea: this.state})
}


export default connect(null, mapDispatchToProps)(IdeaForm)
