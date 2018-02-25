import React from 'react'

const friendItem = (props) => {

  const dragstart = (e) => {
    const friend = JSON.stringify(props.friend)
    e.dataTransfer.setData('friend', friend)
  }

  return (
    <div className='friendItem' draggable='true' onDragStart={dragstart}>
      <li>{props.friend.first_name + " " + props.friend.last_name}</li>
    </div>
  )
}

export default friendItem
