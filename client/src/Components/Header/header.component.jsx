import React from "react";
import "./header.styles.sass";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";

const Header = ({ currentUser }) => {
  return (
    <div className="navbar header">
      <Link to={"/"} className="navbar-brand logo">
        <span>Track</span>Sactions
      </Link>

      <div className="navbar-nav headerLinks ml-auto d-flex flex-row">
        <Link className="nav-item headerLink" to={"/profile"} >
          Profile
        </Link>
        {currentUser ? (
          <button className="nav-item headerLink" onClick={() => auth.signOut()}>
            Sign Out
          </button>
        ) : (
          <Link className="nav-item headerLink" to={"/signin"}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);
