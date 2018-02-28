import React from 'react'
import { connect } from 'react-redux'

const IdeasList = (props) =>  {

  const handleViewIdea = (e) => {
    props.history.push(`/ideas/${e.currentTarget.id}`)
  }

  const handleNewIdea = () => {
    props.history.push(`/ideas/new`)
  }

  return (
    <div>
      <p>YOUR IDEAS</p>
      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
      {props.ideas.map( i =>
        <div className='miniIdea' id={i.id} key={i.id} onClick={handleViewIdea}>
          {i.owner_id === props.user_id ?
            <img className='miniIdeaIcon Owned' src={require('../threeSeeds.jpg')}></img>
            :
            <img className='miniIdeaIcon' src={require('../threeSeeds.jpg')}></img>
          }
          <div>{i.name}</div>
          <br></br>
        </div>
      )}
      </div>
      <br></br>
      <button onClick={handleNewIdea}>Create New Idea</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas,
    user_id: state.user.id
  }
}

export default connect(mapStateToProps, null)(IdeasList)
