import React, { Component } from 'react'

class GoogleOAuth extends Component {

  state = {
    name: '',
    discoveryDocs: ["https://www.googleapis.com/auth/calendar"],
    scopes: 'profile',
    clientId:'677208611130-k2h5h3ql7hljj978rfsajviujkfku8ng.apps.googleusercontent.com'
}

      handleClientLoad() {
        // Load the API client and auth2 library
        gapi.load('client:auth2', initClient);
      }
      
      initClient() {
        gapi.client.init({
            // apiKey: apiKey,
            discoveryDocs: this.state.discoveryDocs,
            clientId: this.state.clientId,
            scope: this.state.scopes
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
      }

       updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
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


      componentDidMount() {
        fetch("https://apis.google.com/js/api.js")
        .then(this.handleClientLoad())
      }


      render() {
        return (
          <div>
              <button id='authorize-button' onClick={this.handleAuthClick}>
                  authorizeButton
              </button>
              <button id='signout-button' onClick={this.handleSignoutClick}>
                  signoutButton
              </button>
            <div>
              Hello {this.state.name} ;
            </div>
          </div>


        )
      }

}
export default GoogleOAuth
