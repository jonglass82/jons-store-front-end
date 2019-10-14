import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Login extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      message: "",
      email: "", 
      password: "", 
    }
  } 

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submit () {
      const params = {
        email: this.email,
        password: this.password
      };

      axios.post('http://localhost:3001/api/login', params).then(res => {
        console.log(params);
      // const email = res.data;
      // const password = res.data;
      // this.setState((state, props) => ({
      //   email: email, 
      //   password: password
      // }));
    })
  };


  render () {
    return <div className="container"> 

    <h2>{this.state.email}</h2>
    <h2>{this.state.password}</h2>

      <h1>Login</h1>

    <Form>
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