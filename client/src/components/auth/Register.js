import React from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn It</h1>
          <h4>Keep track of what you are learning</h4>
          <Form className="my-4">
            <Form.Group>
              <Form.Control
                text="text"
                placeholder="Username"
                name="username"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                text="password"
                placeholder="Password"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                text="password"
                placeholder="Confirm password"
                name="confirm_password"
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Register
            </Button>
            <p>I have an account ?</p>
            <Link to="/login">
              <Button variant="info" size="sm" className="ml-2">
                Login
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register
