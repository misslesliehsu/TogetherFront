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

  }

  componentDidMount() {
      this.loadApi()
  }


   handleAuthClick(event) {
    window.gapi.auth2.getAuthInstance().signIn();

  }


  render() {
      return (
        <div>
        </div>
      )
  }



}
