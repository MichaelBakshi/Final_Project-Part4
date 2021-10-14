import React from "react";
import { Component } from "react";
import axios from "axios";
import AuthService from "./auth-service";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  tryLogin = (e) => {
    // alert(
    //   `username: ${this.state.username} \n password: ${this.state.password}`
    // );
    this.requestBody = {
      UserName: this.state.username,
      Password: this.state.password,
    };

    axios({
      method: "post",
      url: "https://localhost:44371/api/auth/token",
      data: this.requestBody,
    })
      .then((result) => {
        console.log(result, "success");
        localStorage.setItem("token", result.data);
        this.handleLogin(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  handleLogin = (token) => {
    userObject = AuthService(token);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  componentDidMount() {
    AuthService();
  }

  // Changing the state:

  // this.setState({
  //   password: "5",
  // });

  //this.state.password = "5"   <--- Dont do that

  render() {
    return (
      <div>
        <label>Username:</label>
        <input
          id="username"
          type="text"
          onChange={this.handleChange}
        ></input>{" "}
        <br />
        <label>Password:</label>
        <input
          id="password"
          type="text"
          onChange={this.handleChange}
        ></input>{" "}
        <br />
        <button id="login" onClick={this.tryLogin}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
