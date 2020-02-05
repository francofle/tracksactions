import React from 'react';
import './transactionsTable.styles.sass';
import { Link } from 'react-router-dom';
import Transaction from '../Transaction/transaction.component';

const TransactionsTable = ({ transactions }) => {
  return (
    <div className='transactionsTableContainer'>
      <div className='transactionsTableDiv'>
        <Link to='/newTransaction' className='newTransactionBtn'>
          <p className='addSign'>+</p>
        </Link>
        <h1 className={'title'}>Transactions</h1>
        {transactions.map(transaction => {
          return <Transaction key={transaction._id} transaction={transaction} />;
        })}
      </div>
    </div>
  );
};

export default TransactionsTable;
