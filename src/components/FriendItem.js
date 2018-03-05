import React from 'react'

const friendItem = (props) => {

  const dragstart = (e) => {
    const friend = JSON.stringify(props.friend)
    e.dataTransfer.setData('friend', friend)
  }


  return (
    <div class="ui card">
      <img src="/assets/images/avatar/large/matthew.png" class="ui image" />
      <div class="content">
        <div class="header">{props.friend.first_name + " " + props.friend.last_name}</div>
      </div>
      <div class="extra content">
        {props.buttonAction && <a onClick={() => props.buttonAction(props.friend)}>{props.label}</a>}
      </div>
    </div>
  )
}

export default friendItem
//
// <div className='friendItem' draggable='true' onDragStart={dragstart}>
// </div>
