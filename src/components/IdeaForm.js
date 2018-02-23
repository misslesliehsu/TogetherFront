import React, { Component } from 'react'
import { connect } from 'react-redux'

class IdeaForm extends Component {

  state = {
    idea: {
      name: '',
      location: '',
      owner: '',
      description: '',
      dateSuggestions: [Date.now]
    },
    suggestionCount: 1
  }

  handleChange = (e) => {
    this.setState(
      {[e.target.name]: e.target.value}
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addIdea(this.state.idea)
  }

  handleSetDate = (e) => {
    let i = parseInt(e.target.name, 10)
    let dateSuggestions = this.state.idea.dateSuggestions
    dateSuggestions[i] = e.target.value
    this.setState({dateSuggestions})
  }


  handleAddDate = () => {
    this.setState({suggestionCount: this.state.suggestionCount++})
    this.setState({...this.state, idea: {...this.state.idea, dateSuggestions: [...this.state.idea.dateSuggestions, Date.now]}})
  }

  renderSuggestions = () => {
    let suggestions = []
    for (let i = 0; i < this.state.suggestionCount; i++) {
      suggestions.push(<input type='date' onChange={this.handleSetDate} name={i} value={this.state.idea.dateSuggestions[i]}></input>)
    }
    return (suggestions)
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='name' placeholder='Idea Name' value={this.state.name} onChange={this.handleChange}></input>
          <input type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.handleChange}></input>
          <input type='textArea' name='description' placeholder='Description' value={this.state.description} onChange={this.handleChange}></input>
          <input type='submit'></input>
        </form>
        <div>
            {this.renderSuggestions()}
        </div>
        <button onClick={this.handleAddDate}></button>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return ({addIdea: (i) => dispatch({type: 'ADD_IDEA', idea: i})})
}


export default connect(null, mapDispatchToProps)(IdeaForm)
