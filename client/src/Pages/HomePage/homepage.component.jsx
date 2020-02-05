import React from 'react';
import './homepage.styles.sass';
import { connect } from 'react-redux';
import AccountSummary from '../../Components/AccountSummary/accountSummary.component';
import TransactionsTable from '../../Components/TransactionsTable/transactionsTable.component';
import WithSpinner from '../../Components/withSpinner/withSpinner.component';

// Redux
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectAllTransactions,
  selectIsTransactionsFetching
} from '../../redux/transaction/transaction.selectors';
import { fetchTransactionsStartAsync } from '../../redux/transaction/transaction.actions';

//withSpinner components:
const TransactionsTableWithSpinner = WithSpinner(TransactionsTable);

class HomePage extends React.Component {
  componentDidMount() {
    const { firebaseId, token } = this.props.currentUser;
    this.props.fetchTransactionsStartAsync(firebaseId, token);
  }

  render() {
    const { currentUser, isTransactionsFetching, transactions } = this.props;

    return (
      <div className='homepage'>
        <AccountSummary currentUser={currentUser} />
        <TransactionsTableWithSpinner
          transactions={transactions}
          isLoading={isTransactionsFetching}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isTransactionsFetching: selectIsTransactionsFetching,
  currentUser: selectCurrentUser,
  transactions: selectAllTransactions
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
