import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'


class Login extends React.Component {
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

  Login = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password

      })
    })
      .then(res => res.json())
      .then(user => {
        localStorage.setItem('token', user.token)
        if(localStorage.token === user.token){
          localStorage.setItem('userId', user.user.id)
          localStorage.setItem('userName', user.user.username)
        }
        if(localStorage.token === user.token){
          this.props.hideLoginBtns()
          this.props.history.history.push('/')
        }else{
          alert('Password or email is invalid')
        }
      })
  }

  render() {
    console.log(this.props)
    return (
      <div className='login-item container'>

        <div className='login-item-child'>
          <div className='login-h1'>
            <h1>Welcome Back!</h1>
          </div>

          <Form onSubmit={(e) => this.Login(e)} className='form-login'>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={(e) => this.handelChange(e)} type="text" placeholder="Enter username" name='username' />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => this.handelChange(e)} type="password" placeholder="Password" name='password' />
            </Form.Group>

            <button className='btn-login'>
              Login
            </button>
            <br></br>

            <div className='login-item-signup'>

            <Link to='/signup'  >New to the site? Signup for FREE!</Link>
            </div>

          </Form>

        </div>

      </div>
    );
  }
}

export default Login;