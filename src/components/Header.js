import React from 'react'
import { Link } from 'react-router-dom'

//If we were to create links using anchor elements, clicking on them would cause the whole page to reload. React Router provides a <Link> component to prevent that from happening. When clicking a <Link>, the URL will be updated and the rendered content will change without reloading the page.

const header = () => {
  return (
    <div className='fullHeader'>
      <div className='togetherLogo'>
        TOGETHER
      </div>
      <div className='headerLeft'>
        <Link to='/'>Dashboard</Link>
        <Link to='/Profile'>Profile</Link>
        <Link to='/Friends'>Friends</Link>
      </div>

      <div className='headerRight'>
        <Link to='/Logout'>Logout</Link>
      </div>
    </div>
  )
}

export default header
