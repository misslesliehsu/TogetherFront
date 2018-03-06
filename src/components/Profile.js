import React, { Component } from 'react'
import { Form, Segment} from 'semantic-ui-react'
import { connect } from 'react-redux'
import URL_ROOT from '../URL'


class ProfilePage extends Component {

  state = {
    editting: false,
    button: "Edit Profile",
    edit: {
      first_name: '',
      last_name: '',
      email: ''
    }
  }

  handleClick = (e) => {
    e.preventDefault()
    if (this.state.editting === true) {
      this.setState({editting: false, button: "Edit Profile"})
    }
    else {
      this.setState({editting: true, button: "Save Changes"})
    }
  }

  render() {
    return (
      <div>
        <p>Your Profile</p>
        {this.state.editting === false ?

          <div>
            <Segment>First name: {this.props.user.first_name}</Segment>
            <Segment>Last name: {this.props.user.last_name}</Segment>
            <Segment>Email address: {this.props.user.email}</Segment>
          </div>
          :

          <Form>
           <Form.Group widths='equal'>
             <Form.Input fluid label='First name' placeholder={this.props.user.first_name} />
             <Form.Input fluid label='Last name' placeholder={this.props.user.last_name} />
             <Form.Input fluid label='Last name' placeholder={this.props.user.email} />
           </Form.Group>
         </Form>
      }
      <br></br><br></br>
      <Form.Button onClick={this.handleClick}>{this.state.button}</Form.Button><br></br>
      {this.state.editting === true  && <Form.Button onClick={this.handleClick}>Go Back</Form.Button>}
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, null)(ProfilePage)
