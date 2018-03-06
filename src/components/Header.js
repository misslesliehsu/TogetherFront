import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'


//If we were to create links using anchor elements, clicking on them would cause the whole page to reload. React Router provides a <Link> component to prevent that from happening. When clicking a <Link>, the URL will be updated and the rendered content will change without reloading the page.

const header = (props) => {

  const handleLogOut = () => {
    localStorage.removeItem('token')
    props.logout()
    props.history.push('/login')
  }


  return (

    <div>
      <div class="togetherLogo">
        TOGETHER
      </div>
      <Menu size='large' pointing secondary>
        
        <Menu.Item><Link class='item' to='/dashboard'>Dashboard</Link></Menu.Item>
        <Menu.Item><Link class='item' to='/Profile'>Profile</Link></Menu.Item>
        <Menu.Item><Link class='item' to='/Friends'>Friends</Link></Menu.Item>
          {props.user_id !== 'start' &&
          <Menu.Menu position='right'>
            <Menu.Item onClick={handleLogOut}>Log Out</Menu.Item>
          </Menu.Menu>
          }
      </Menu>


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
