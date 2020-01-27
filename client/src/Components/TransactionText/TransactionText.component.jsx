import React from 'react';
import './TransactionText.styles.sass'

const TransactionText = ({text, width}) => {
  return (
    <div className='transactionText' style={{'width': width}}>
      <div className="trxTextContainer" >
        <p className='trxText' >{text}</p>
      </div>
    </div>
  )
};

export default TransactionText;