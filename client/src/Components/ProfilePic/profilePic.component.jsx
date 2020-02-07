import React from 'react';
import './profilePic.styles.sass';
import { Link } from 'react-router-dom';

const ProfilePic = ({ profileImg }) => {
  const style = {
    background: `url(${profileImg}) center center no-repeat`,
    backgroundSize: `cover`
  };

  return <Link className='profileImg' style={style} to={'/profile'}/>;
};

export default ProfilePic;
