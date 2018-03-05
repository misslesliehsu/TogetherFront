import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


//If we were to create links using anchor elements, clicking on them would cause the whole page to reload. React Router provides a <Link> component to prevent that from happening. When clicking a <Link>, the URL will be updated and the rendered content will change without reloading the page.

const header = (props) => {

  const handleLogOut = () => {
    localStorage.removeItem('token')
    props.logout()
    props.history.push('/login')
  }


  return (

    <div>
      <div className='fullHeader'>
        <div className='togetherLogo'>
          TOGETHER
        </div>

        <div class="ui menu">
          <Link class='item' to='/dashboard'>Dashboard</Link>
          <Link class='item' to='/Profile'>Profile</Link>
          <Link class='item' to='/Friends'>Friends</Link>
        </div>


        <div className='headerRight'>
          {props.user_id !== 'start' &&
          <li onClick={handleLogOut}>Log Out</li>
        }
        </div>
      </div>
    </div>

  )
}


const mapDispatchToProps = (dispatch) => {
  return ({
    logout: () => dispatch({type:'LOGOUT'})
  })
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user.id
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(header)
