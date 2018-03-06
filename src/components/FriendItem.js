import React from 'react'

const friendItem = (props) => {

  const dragstart = (e) => {
    const friend = JSON.stringify(props.friend)
    e.dataTransfer.setData('friend', friend)
  }


  return (
    <div>
      {props.friend.first_name + " " + props.friend.last_name}
        {props.buttonAction && <button onClick={() => props.buttonAction(props.friend)}>{props.label}</button>}
    </div>
  )
}

export default friendItem
//
// <div className='friendItem' draggable='true' onDragStart={dragstart}>
// </div>
