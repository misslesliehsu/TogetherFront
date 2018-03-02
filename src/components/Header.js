import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
//If we were to create links using anchor elements, clicking on them would cause the whole page to reload. React Router provides a <Link> component to prevent that from happening. When clicking a <Link>, the URL will be updated and the rendered content will change without reloading the page.

const header = () => {

  const handleLogOut = () => {
    localStorage.removeItem('token')
    this.props.logout
    this.props.history.push('/login')
  }


  return (
    <div className='fullHeader'>
      <div className='togetherLogo'>
        TOGETHER
      </div>
      <div className='headerLeft'>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/Profile'>Profile</Link>
        <Link to='/Friends'>Friends</Link>
      </div>

      <div className='headerRight'>
        <li onClick={handleLogOut}>Log Out</li>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: ()=> dispatch({type:'LOGOUT'})
  }
}

export default connect(null, mapDispatchToProps)(header)
