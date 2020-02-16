import React from 'react';
import './transactionsTable.styles.sass';
import { Link } from 'react-router-dom';
import Transaction from '../Transaction/transaction.component';


class TransactionsTable extends React.Component {
  updateTrxBtnClicked = transactionId => {
    console.log(transactionId);
    // update redux with id of Transaction/trxInEdit and load updateTransaction
  };

  deleteTrxBtnClicked = transaction => {
    console.log(transaction);
    // alert confirmation and delete form database upon confirmation, refresh component
  };

  render() {
    const { transactions } = this.props;
    return (
      <div className='transactionsTableContainer'>
        <div className='transactionsTableDiv'>
          <Link to='/newTransaction' className='newTransactionBtn'>
            <p className='addSign'>+</p>
          </Link>
          <h1 className={'title'}>Transactions</h1>
          {transactions.map(transaction => {
            return (
              <Transaction
                key={transaction._id}
                transaction={transaction}
                updateTrxBtnClicked={this.updateTrxBtnClicked}
                deleteTrxBtnClicked={this.deleteTrxBtnClicked}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TransactionsTable;
