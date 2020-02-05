import React from 'react';
import './transaction.styles.sass';
import TransactionText from '../TransactionText/TransactionText.component';
import moment from 'moment';
import { separateNumbersWithComma } from '../../utils/utilities';

const Transaction = ({ transaction }) => {
  const { date, amount, payee, memo } = transaction;
  return (
    <div className='transactionContainer'>
      <div className='transaction'>
        <div className='rowContainer'>
          <div className='input-group'>
            <label className='txtLabel'>Date: </label>
            <TransactionText text={moment(date).format('MM/DD/YYYY')} />
          </div>
          <div className='input-group'>
            <label className='txtLabel'>Payee: </label>
            <TransactionText text={payee.name} width={'75%'} />
          </div>
          <div className='input-group'>
            <label className='txtLabel'>Amount: </label>
            <TransactionText
              text={`$ ${separateNumbersWithComma(amount.$numberDecimal)}`}
              width={'50%'}
            />
          </div>
        </div>
        <div className='rowContainer'>
          <div className='input-group w-100'>
            <label className='txtLabel'>Memo: </label>
            <TransactionText text={memo} width={'85%'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
