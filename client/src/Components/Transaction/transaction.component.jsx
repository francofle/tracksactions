import React from 'react';
import './transaction.styles.sass';
import TransactionText from '../TransactionText/TransactionText.component';
import moment from 'moment';
import { separateNumbersWithComma } from '../../utils/utilities';

const Transaction = ({ transaction, updateTrxBtnClicked, deleteTrxBtnClicked }) => {
  const { date, amount, payee, memo, isDebit } = transaction;
  return (
    <div className='container transactionContainer'>
      <div className='row my-2'>
        <div className='col-md-3 col-xs-12'>
          <div className='form-inline'>
            <label className='txtLabel'>Date: </label>
            <TransactionText text={moment.parseZone(date).format('MM/DD/YYYY')} />
          </div>
        </div>
        <div className='col-md-6 col-xs-12'>
          <div className='form-inline'>
            <label className='txtLabel'>Payee: </label>
            <TransactionText text={payee.name} />
          </div>
        </div>
        <div className='col-md-3 col-xs-12'>
          <div className='form-inline '>
            <label className='txtLabel'>Amount: </label>
            <TransactionText
              text={`$ ${separateNumbersWithComma(amount.$numberDecimal)}`}
              isDebit={isDebit}
            />
          </div>
        </div>
      </div>
      <div className='row pb-2'>
        <div className='col-12'>
          <div className='form-inline'>
            <label className='txtLabel'>Memo: </label>
            <TransactionText text={memo}/>
          </div>
        </div>
      </div>
        <div className='container trxButtons'>
          <div className='row'>
            <div className="col-4"></div>
          <div className='editButtonContainer col-2'>
            <button className='editButton' onClick={() => updateTrxBtnClicked(transaction._id)}>
              <i className='far fa-edit'></i>
            </button>
          </div>
          <div className='deleteButtonContainer col-2'>
            <button className='deleteButton' onClick={deleteTrxBtnClicked} data-name={payee.name} data-date={date} data-amount={amount.$numberDecimal} data-trxType={isDebit}>
              <i className='fas fa-trash-alt trashIcon' data-name={payee.name} data-date={date} data-amount={amount.$numberDecimal} data-trxType={isDebit}></i>
            </button>
          </div>
            <div className="col-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
