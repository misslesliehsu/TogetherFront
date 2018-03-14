import React, { Component } from 'react'

export default class GoogleOAuth extends Component {

  state = {
    GoogleAuth: null,
    gapiReady: false
  }

  componentDidMount() {
      console.log('mounted')
      // const script = document.getElementById("thisOne");
      // script.src = "https://apis.google.com/js/client.js";
      //
      // script.onload = () => {
      //   console.log('here')
        debugger
        console.log()
        // window.gapi.client.init({
        //     'apiKey': "AIzaSyB37beo2-akUWQB0Bnnb1MHr-BjoXoeC5g",
        //     'clientId': '677208611130-k2h5h3ql7hljj978rfsajviujkfku8ng.apps.googleusercontent.com',
        //     'scope': 'https://www.googleapis.com/auth/calendar',
        //     'discoveryDocs': ['https://www.googleapis.com/discovery/v1/calendar/v3/rest']
        // }).then(this.setState({GoogleAuth: window.gapi.auth2.getAuthInstance(), gapiReady: true}))

      // }
      //
      // script.onload = () => {
      //   window.gapi.load('client', () => {
      //     window.gapi.client.setApiKey('AIzaSyB37beo2-akUWQB0Bnnb1MHr-BjoXoeC5g');
      //     window.gapi.client.load('calendar', 'v3', () => {
      //
      //       this.setState({ gapiReady: true });
      //     })
      //   })
      
  }


    // fetch('https://apis.google.com/js/client.js', {
    // })
    // .then(console.log)

    // window.gapi.client.init({
    //     'apiKey': "AIzaSyB37beo2-akUWQB0Bnnb1MHr-BjoXoeC5g",
    //     'clientId': '677208611130-k2h5h3ql7hljj978rfsajviujkfku8ng.apps.googleusercontent.com',
    //     'scope': 'https://www.googleapis.com/auth/calendar',
    //     'discoveryDocs': ['https://www.googleapis.com/discovery/v1/calendar/v3/rest']
    // }).then(this.setState({GoogleAuth: window.gapi.auth2.getAuthInstance(), gapiReady: true}))

    // this.state.GoogleAuth.isSignedIn.listen(updateSigninStatus);



  render() {
    if (this.state.gapiReady) {
      return (
        <h1>GAPI is loaded and ready to use.</h1>
        )
    }
    else {
      return (
        <div>NOT YET</div>
      )
    }
  }



}
