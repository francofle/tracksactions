import React from 'react';
import './profilePage.styles.sass';
import ProfilePic from "../../Components/ProfilePic/profilePic.component";

const ProfilePage = () => {
  return (
    <div className='profilePage container-fluid'>
      <div className="row">
        <div className="col-12">
          <h2 className='pageTitle'>Profile Picture</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 profilePicContainer mt-3">
          <ProfilePic profileImg='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3578&q=80' />
        </div>
        <div className="col-12 fileChooserContainer mt-2">
          <h4>Upload picture</h4>
        </div>
      </div>


      {/* Foto */}
      {/* File chooser */}
      {/* name */}
    </div>
  );
};

export default ProfilePage;
