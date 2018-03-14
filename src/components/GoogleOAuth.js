import React, { Component } from 'react'

export default class GoogleOAuth extends Component {

  state = {
    googleAuth: null,
    gapiReady: false,
    authorizeState: '',
    signoutState: ''
  }

  componentDidMount() {
    window.gapi.auth2.init({
            'apiKey': "AIzaSyB37beo2-akUWQB0Bnnb1MHr-BjoXoeC5g",
            'clientId': '677208611130-k2h5h3ql7hljj978rfsajviujkfku8ng.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/calendar',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/calendar/v3/rest']
        }).then(this.setState({googleAuth: window.gapi.auth2.getAuthInstance(), gapiReady: true}))
        .then(function () {
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });


   updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.state.authorizeState = 'none';
      this.state.signoutState = 'block';
      makeApiCall();
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
    }
  }

   handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

   handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }
  // Load the API and make an API call.  Display the results on the screen.

   makeApiCall() {
    gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    }).then(function(resp) {
      var name = resp.result.names[0].givenName;
      this.setState({ name })
    });
  }




  render() {
    if (this.state.gapiReady) {
      return (
        <h1>GAPI is loaded and ready to use.</h1>
        <button onClick={this.handleAuthClick} style={{display:{this.state.authorizeState}}}>Authorize</button>
        <button onClick={this.handleSignoutClick} style={{display:{this.state.signoutState}}}>Sign Out</button>
        )
    }
    else {
      return (
        <div>NOT YET</div>
      )
    }
  }



}
