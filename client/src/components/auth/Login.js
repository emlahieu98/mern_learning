import React,{useState, useContext} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../contexts/AuthContext'

const Login = () => {
  const {loginUser} = useContext(AuthContext)


  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const {username, password} = loginForm
  const onChangeLoginForm = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  }
  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginUser);
      console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn It</h1>
          <h4>Keep track of what you are learning</h4>
          <Form className="my-4" onSubmit={login}>
            <Form.Group>
              <Form.Control
                text="text"
                placeholder="Username"
                name="username"
                required
                value={username}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                text="password"
                placeholder="Password"
                name="password"
                required
                value={password}
                onChange={onChangeLoginForm}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Login
            </Button>
            <p>Don't have an account ?</p>
            <Link to="/register">
              <Button variant="info" size="sm" className="ml-2">
                Register
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );   
}

export default Login
