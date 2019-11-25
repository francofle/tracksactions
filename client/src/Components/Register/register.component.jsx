import React from "react";
import "./register.styles.sass";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value
      },
      () => {
        console.log(this.state);
      }
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <div className="registerPage">
        <h1 className="title">Register</h1>

        <form action="">
          <div className="form-group">
            <input
              name="name"
              type="text"
              placeholder="Name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="registerButtonDiv">
            <Link to="/signIn" className="signInLink">
              Sign In
            </Link>

            <button
              className="registerBtn"
              type="submit"
              onClick={this.handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
