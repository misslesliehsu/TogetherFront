
  const loadApi = () => {
      this.setState({eventScheduled: this.props.event})
      const script = document.createElement("script")
      script.src = "https://apis.google.com/js/client.js"

      script.onload = () => {
        window.gapi.load('client:auth2', initClient)}
      document.body.appendChild(script)

      const initClient = () => {
        window.gapi.auth2.init({
                'apiKey': "AIzaSyB37beo2-akUWQB0Bnnb1MHr-BjoXoeC5g",
                'clientId': '677208611130-k2h5h3ql7hljj978rfsajviujkfku8ng.apps.googleusercontent.com',
                'scope': 'https://www.googleapis.com/auth/calendar',
                'discoveryDocs': ['https://www.googleapis.com/discovery/v1/calendar/v3/rest']
            })
        }
    }



  // componentDidMount() {
  //     this.loadApi()
  // }


   //  updateSigninStatus(isSignedIn) {
   //   if (isSignedIn) {
   //     this.setState({authorizeState: 'none', signoutState: 'block'})
   //     console.log('signedIn')
   //     // this.makeApiCall();
   //   } else {
   //     this.setState({authorizeState: 'block', signoutState: 'none'})
   //   }
   // }


   function handleAuthClick() {
    window.gapi.auth2.getAuthInstance().signIn();
    }

   //
   //  handleSignoutClick(event) {
   //    window.gapi.auth2.getAuthInstance().signOut();
   // }
