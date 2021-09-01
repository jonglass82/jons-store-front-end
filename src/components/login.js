import React from 'react'
import axios from 'axios'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";


class Login extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      message: "",
      email: "", 
      password: "" 
    }
  } 

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit = (e) => {

      e.preventDefault();

      const params = {
        email: this.state.email,
        password: this.state.password
      };

      axios.post('https://jons-store.herokuapp.com/api/login', params).then(res => {
        console.log(res.data);
        if (res.data.authenticated) {
          this.props.handleLogin(res.data.token);
        } else {
          this.setState({
            message: <Alert color="danger">{res.data}</Alert>
          })
        }
    })

  };

  render () {
    return this.props.loggedIn ?
    <Redirect to="dashboard" /> :
    <div className="container"> 

      <h1>Login</h1>

        {this.state.message}          

    <Form onSubmit={this.submit}>

        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" value={this.email} onChange= {this.onChange} placeholder="" />
        </FormGroup>

        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" value={this.password} onChange= {this.onChange} placeholder="" />
        </FormGroup>
        
        <Button>Submit</Button>
    </Form>

        </div>
  }

}

export default Login;