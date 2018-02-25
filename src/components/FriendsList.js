import React from 'react'
import FriendItem from './FriendItem'


const friendsList = (props) => {
  //FriendsList is always told what friends to get through store / props; doesn't do its own fetches

  const allFriends = props.friends.map(f => <FriendItem key={f.first_name} friend={f}/>)

  return (
    <div>
      Hey I am the FriendsList
      {allFriends}
    </div>
  )

}

export default friendsList
