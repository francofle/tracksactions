import React from 'react';
import {loginUser} from "../../firebase/firebase.utils";
import { auth} from "../../firebase/firebase.utils";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleInputChange = event => {
    const {value, name} = event.target;
    this.setState({
      [name]:value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    loginUser(this.state.email, this.state.password);
  };

  render() {
    return (
      <div>
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={{ width: "300px" }}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="password"
              style={{ width: "300px" }}
              onChange={this.handleInputChange}
            />
          </div>
          <button type="submit">
            Sign In
          </button>
          <button type="submit" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        </form>
      </div>
    )
  }
}

export default SignIn;