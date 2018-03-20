import React, { Component } from 'react'

export default class GoogleOAuth extends Component {

  state = {
    googleAuth: null,
    gapiReady: false,
    eventScheduled: null,
    authorizeState: '',
    signoutState: ''
  }


  loadApi() {
      this.setState({eventScheduled: this.props.event})
      const script = document.createElement("script")
      script.src = "https://apis.google.com/js/client.js"

      script.onload = () => {
        window.gapi.load('client:auth2', this.initClient)}
      document.body.appendChild(script)
  }


  initClient() {
    window.gapi.auth2.init({
            'apiKey': "AIzaSyB37beo2-akUWQB0Bnnb1MHr-BjoXoeC5g",
            'clientId': '677208611130-k2h5h3ql7hljj978rfsajviujkfku8ng.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/calendar',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/calendar/v3/rest']
        })
      .then(function () {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
          // Handle the initial sign-in state.
          this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get())
        })
  }

  componentDidMount() {
      this.loadApi()
  }


    updateSigninStatus(isSignedIn) {
     if (isSignedIn) {
       this.setState({authorizeState: 'none', signoutState: 'block'})
       console.log('signedIn')
       // this.makeApiCall();
     } else {
       this.setState({authorizeState: 'block', signoutState: 'none'})
     }
   }


   handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();
    }

    handleSignoutClick(event) {
      window.gapi.auth2.getAuthInstance().signOut();
   }



  render() {
      return (
        <div>
          HEYO
          <button id='authorize-button' onClick={this.handleAuthClick}>
              authorizeButton
          </button>
          <button id='signout-button' onClick={this.handleSignoutClick}>
              signoutButton
          </button>
          <button onClick={this.handleEventCreation}>
            Make an calendarEvent!
          </button>
        </div>
      )
  }



}
