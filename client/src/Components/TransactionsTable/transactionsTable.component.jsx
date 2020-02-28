import React from 'react';
import './transactionsTable.styles.sass';
import { Link } from 'react-router-dom';
import Transaction from '../Transaction/transaction.component';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

class TransactionsTable extends React.Component {
  state = {
    counter: 5
  };

  updateTrxBtnClicked = transactionId => {
    this.props.history.push(`/updateTransaction/${transactionId}`);
  };

  deleteTrxBtnClicked = transaction => {
    console.log(transaction);
    // todo: alert confirmation and delete form database upon confirmation, refresh component
  };

  sessionExpired = () => {
    // todo: move to homepage and add conditional routing
    setTimeout(() => auth.signOut(), 3000);
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
          {transactions ? (
            transactions.map(transaction => {
              return (
                <Transaction
                  key={transaction._id}
                  transaction={transaction}
                  updateTrxBtnClicked={this.updateTrxBtnClicked}
                  deleteTrxBtnClicked={this.deleteTrxBtnClicked}
                />
              );
            })
          ) : (
            // todo: move this to App.js and add conditional routing
            <div className='sessionExpiredContainer container-fluid'>
              <div className='row sessionExpiredDiv'>
                <div className='col-12'>
                  <h1 onLoad={this.sessionExpired()}>Your session expired.</h1>
                </div>
                <div className='col-12'>
                  <p>
                    You're being redirected to the login page.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(TransactionsTable);
