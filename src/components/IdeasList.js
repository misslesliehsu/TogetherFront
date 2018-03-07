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
      <br></br><br></br>
      <button className='createIdeaButton' onClick={handleNewIdea}>Create New Idea</button>
      <br></br><br></br>
      <br></br><br></br>
      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
      {props.ideas.map( i =>
        <div className='miniIdea' id={i.id} key={i.id} onClick={handleViewIdea}>
          {i.owner_id === props.user_id ?
            <img className='miniIdeaIcon Owned' src={require('../blueThoughtOwn.png')}></img>
            :
            <img className='miniIdeaIcon' src={require('../blueThought.png')}></img>
          }
          <div className='miniIdeaCaption'>{i.name}</div>
        </div>
      )}
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ideas: state.ideas.filter( i => i.scheduled_date === ''),
    user_id: state.user.id
  }
}

export default connect(mapStateToProps, null)(IdeasList)
