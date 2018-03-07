import React from 'react'

const friendItem = (props) => {

  const dragstart = (e) => {
    const friend = JSON.stringify(props.friend)
    e.dataTransfer.setData('friend', friend)
  }


  return (
    <div>
      <div className='friendCard'>
        {props.friend.first_name + " " + props.friend.last_name}
        <br></br>
        <br></br>
        {props.buttonAction && <button onClick={() => props.buttonAction(props.friend)}>{props.label}</button>}
      </div>
    </div>
  )
}

export default friendItem
//
// <div className='friendItem' draggable='true' onDragStart={dragstart}>
// </div>
