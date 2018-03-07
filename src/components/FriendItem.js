import React from 'react'

const friendItem = (props) => {

  const dragstart = (e) => {
    const friend = JSON.stringify(props.friend)
    e.dataTransfer.setData('friend', friend)
  }


  return (
    <div className='friendCard'>
      <h1>{props.friend.first_name + " " + props.friend.last_name}</h1>
      <br></br>
        {props.buttonAction && <button onClick={() => props.buttonAction(props.friend)}>{props.label}</button>}
    </div>
  )
}

export default friendItem
//
// <div className='friendItem' draggable='true' onDragStart={dragstart}>
// </div>
