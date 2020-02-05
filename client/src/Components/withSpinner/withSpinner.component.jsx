import React from 'react';
import './withSpinner.styles.sass';

const withSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div className='spinnerOverlay'>
      <div className='spinnerContainer'></div>
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default withSpinner;
