import React from 'react';
import './profilePic.styles.sass'

const ProfilePic = ({profileImg}) => {

  const style = {
    background: `url(${profileImg}) center center no-repeat`,
    backgroundSize: `cover`,
  };

  return (
    <div className="profileImg" style={style}>
    </div>
  )
};

export default ProfilePic;