import React from 'react';
import './profilePage.styles.sass';
import ProfilePic from "../../Components/ProfilePic/profilePic.component"
import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import {separateNumbersWithComma} from "../../utils/utilities";

const ProfilePage = ({currentUser}) => {
  return (
    <div className='profilePage container-fluid'>
      <div className="row">
        <div className="col-12">
          <h2 className='pageTitle'>Profile</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 profilePicContainer mt-3">
          <ProfilePic profileImg='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3578&q=80' />
        </div>
        <div className="col-12 fileChooserContainer mt-2">
          {/*<h4>Upload Profile Image</h4>*/}
          {/* File Upload */}
        </div>
        <div className="col-12 detailsWrapper">
          <ul className='detailsList list-unstyled d-flex flex-column'>
            <li><span className='font-weight-bold'>Name</span> &emsp; {currentUser.name}</li>
            <li><span className='font-weight-bold'>Email</span> &emsp; {currentUser.email}</li>
            <li><span className='font-weight-bold'>Total Balance</span> &emsp; $&nbsp;{separateNumbersWithComma(currentUser.totalBalance.$numberDecimal)}</li>
          </ul>
        </div>
      </div>
          {/* ImageCollection */}


      {/* Foto */}
      {/* File chooser */}
      {/* name */}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(ProfilePage);
