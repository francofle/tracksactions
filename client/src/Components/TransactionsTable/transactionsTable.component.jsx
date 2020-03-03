import React from 'react';
import './transactionsTable.styles.sass';
import { Link } from 'react-router-dom';
import Transaction from '../Transaction/transaction.component';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import ModalConfirm from '../ModalConfirm/modalConfirm.component';

class TransactionsTable extends React.Component {
  state = {
    counter: 5,
    show: false,
    trxAmount: '',
    trxDate: '',
    trxPayee:'',
    trxType: false
  };

  showModal = event => {
    this.setState({
      show: !this.state.show,
      trxAmount: event.target.getAttribute('data-amount'),
      trxDate: event.target.getAttribute('data-date'),
      trxPayee: event.target.getAttribute('data-name'),
      trxType: event.target.getAttribute('data-trxtype')
    });
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
    const {trxDate, trxAmount, trxPayee, trxType} = this.state;
    return (
      <div className='transactionsTableContainer container-fluid h-100'>
        <div className='row h-100'>
          <div className='transactionsTableDiv h-100'>
            <Link to='/newTransaction' className='newTransactionBtn position-sticky'>
              <p className='addSign'>+</p>
            </Link>
            <h1 className={'title'}>Transactions</h1>
            <ModalConfirm onClose={this.showModal} show={this.state.show} title={'Delete Transaction'} body={`Are you sure you want to delete the transaction?`} transaction={{trxDate, trxPayee, trxAmount, trxType}} />
            {transactions ? (
              transactions.map(transaction => {
                return (
                  <Transaction
                    key={transaction._id}
                    transaction={transaction}
                    updateTrxBtnClicked={this.updateTrxBtnClicked}
                    deleteTrxBtnClicked={event => this.showModal(event)}
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
                    <p>You're being redirected to the login page.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(TransactionsTable);
