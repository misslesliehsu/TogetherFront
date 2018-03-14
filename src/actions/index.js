import URL_ROOT from '../URL'

export function login(u) {
  return dispatch => {
  dispatch({type: "LOGIN", user:u})
  }
}


export function getCurrentUser() {
  return dispatch => {
    fetch(`http://localhost:3001/current_user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token')
      }
    }).then(res => res.json())
    .then(res => {
      if (res) {
        dispatch({type: "LOGIN", user: res.user})
      }
      else {
        dispatch({type:'LOGOUT'})
      }
    })
  }
}

export function loadData(user_id) {
  return dispatch => {
    fetch(`${URL_ROOT}users/${user_id}/ideas`)
    .then(res => res.json())
    .then(res =>{
       dispatch({type: 'LOAD_IDEAS', ideas: res})})

    fetch(`${URL_ROOT}users/${user_id}/friendships`)
    .then(res=> res.json())
    .then(res => {
      dispatch({type: 'LOAD_FRIENDS', friends: res.friends})
      dispatch({type: 'LOAD_NONFRIENDS', nonFriends: res.nonFriends})
    })

    fetch(`${URL_ROOT}invitations/${user_id}`)
    .then(res=> res.json())
    .then(res => {
      dispatch({type: 'LOAD_INVITATIONS', invitations: res})
    })
  }
}
