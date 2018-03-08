import React from 'react'

const friendItem = (props) => {

  const dragstart = (e) => {
    const friend = JSON.stringify(props.friend)
    e.dataTransfer.setData('friend', friend)
  }


  return (
    <div className='friendCard' onClick={() => props.buttonAction(props.friend)}>
      {props.buttonAction ?
        <div>
          <img className='profilePic' src={props.friend.profile_pic}></img><br></br>
          <div>{props.friend.first_name + " " + props.friend.last_name}</div>
        </div>
      :
        <div>
          <img className='profilePic' src={props.friend.profile_pic}></img><br></br>
          <div>{props.friend.first_name + " " + props.friend.last_name}</div>
        </div>
    }
    </div>
  )
}

export default friendItem
//
// <div className='friendItem' draggable='true' onDragStart={dragstart}>
// </div>
