import React from 'react';
import './TransactionText.styles.sass';

const TransactionText = ({ text, width, isDebit }) => {
  return (
    <div className='transactionText' style={{ width: width }}>
      <div className='trxTextContainer'>
        <p className='trxText'>
          {isDebit ? '-' : ''}
          {text}
        </p>
      </div>
    </div>
  );
};

export default TransactionText;
