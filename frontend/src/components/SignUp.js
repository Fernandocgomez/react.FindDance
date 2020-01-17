import React from 'react';
import { Form } from 'react-bootstrap';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handelChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  signUp = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        password_confirmation: this.state.password_confirmation,
        email: this.state.email,

      })
    })
      .then(res => res.json())
      .then(console.log)
    this.props.history.history.push('/login')
  }

  render() {
    return (
      
      <div className='signup-item'>

        <div className='signup-item-child'>

          <div className='signup-h1'>

            <h1>Register And Have Access To All The Dancing Socials In Your Area!</h1>

          </div>

          <Form onSubmit={(e) => this.signUp(e)} className='form-signup'>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(e) => this.handelChange(e)} type="text" placeholder="Enter username" name='username' />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => this.handelChange(e)} type="email" placeholder="Enter email" name='email' />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => this.handelChange(e)} type="password" placeholder="Password" name='password' />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password confirmation</Form.Label>
              <Form.Control onChange={(e) => this.handelChange(e)} type="password" placeholder="Confirm Password" name='password_confirmation' />
            </Form.Group>

            <button className='btn-signup'>
              Register
            </button>

          </Form>

        </div>

      </div>

    );
  }
}

export default SignUp;