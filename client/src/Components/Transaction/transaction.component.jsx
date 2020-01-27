import React from 'react';
import './transaction.styles.sass';
import TransactionText from '../TransactionText/TransactionText.component';

const Transaction = ({ trxDate, trxPayee = 'Payee', trxAmount, trxMemo, trxType }) => {
  return (
    <div className='transactionContainer'>
      <div className='transaction'>
        <div className='rowContainer'>
          <div className='input-group'>
            <label className='txtLabel'>Date: </label>
            <TransactionText text={'01/01/2020'} />
          </div>
          <div className='input-group'>
            <label className='txtLabel'>Payee: </label>
            <TransactionText text={'Advanced Auto Parts'}/>
          </div>
          <div className='input-group'>
            <label className='txtLabel'>Amount: </label>
            <TransactionText text={'$2,000.00'} />
          </div>
        </div>
        <div className='rowContainer'>
          <div className='input-group w-100'>
            <label className='txtLabel'>Memo: </label>
            <TransactionText text={'This is a test memo'} width={'85%'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
