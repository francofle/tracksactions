import React from 'react';
import './homepage.styles.sass';
import { connect } from 'react-redux';
import AccountSummary from '../../Components/AccountSummary/accountSummary.component';
import TransactionsTable from '../../Components/TransactionsTable/transactionsTable.component';
import WithSpinner from '../../Components/withSpinner/withSpinner.component';

// Redux
import { fetchTransactionsStartAsync } from '../../redux/transaction/transaction.actions';

//withSpinner components:
const TransactionsTableWithSpinner = WithSpinner(TransactionsTable);

class HomePage extends React.Component {
  componentDidMount() {
    const { firebaseId, token } = this.props.currentUser;
    this.props.fetchTransactionsStartAsync(firebaseId, token);
  }

  render() {
    const { currentUser, isTransactionsFetching, transactions, totalBalance } = this.props;

    return (
      <div className='homepage container-fluid'>
        <div className='row'>
          <AccountSummary currentUser={currentUser} totalBalance={totalBalance} />
        </div>
        <div className='row h-100'>
          <TransactionsTableWithSpinner
            transactions={transactions}
            isLoading={isTransactionsFetching}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isTransactionsFetching: state.transaction.isFetching,
  currentUser: state.user.currentUser,
  transactions: state.transaction.transactions
});

const mapDispatchToProps = dispatch => {
  return {
    fetchTransactionsStartAsync: (firebaseId, token) =>
      dispatch(fetchTransactionsStartAsync(firebaseId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
