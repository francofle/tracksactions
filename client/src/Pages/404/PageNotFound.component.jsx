import React from 'react';
import './PageNotFound.styles.sass';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
      <div className='pageNotFoundDiv'>
        <h1 className='title'>Page Not Found</h1>
        <div className='body'>
          <Link to={'/'}>Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
