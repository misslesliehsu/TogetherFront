import React from 'react'
import { connect } from 'react-redux'
import IdeaCard from './IdeaCard'

const IdeasList = (props) =>  {

  const allIdeas = props.ideas.map(i => <IdeaCard key={i.id} idea={i}/>)

  return (
    <div>
      <p>Hey I'm the IdeasList</p>
      {allIdeas}
      <button>Create Idea</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas
  }
}

export default connect(mapStateToProps, null)(IdeasList)
