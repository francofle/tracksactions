import React from 'react';
import './homepage.styles.sass';
import { connect } from 'react-redux';
import AccountSummary from '../../Components/AccountSummary/accountSummary.component';
import TransactionsTable from '../../Components/TransactionsTable/transactionsTable.component';
import WithSpinner from '../../Components/withSpinner/withSpinner.component';

// Redux
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectAllTransactions } from '../../redux/transaction/transaction.selectors';
import { setTransactions } from '../../redux/transaction/transaction.actions';

//withSpinner components:
const TransactionsTableWithSpinner = WithSpinner(TransactionsTable);

class HomePage extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    console.log('Component did mount: ');
    console.log(this.state);
    const { firebaseId, token } = this.props.currentUser;

    // todo: redux thunk this. async it
    const { setTransactions } = this.props;
    fetch(`/api/users/${firebaseId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setTimeout(() => {
          setTransactions(data.transactions);
          this.setState({ loading: false,
            transactions: data.transactions});
          console.log(this.state);
        }, 1000);
      })
      .catch(error => console.log(error));
  }

  render() {
    const { currentUser } = this.props;
    console.log('Rendered');

    return (
      <div className='homepage'>
        <AccountSummary currentUser={currentUser} />
        <TransactionsTableWithSpinner
          transactions={this.state.transactions ? this.state.transactions : null} isLoading={this.state.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  transactions: selectAllTransactions
});

const mapDispatchToProps = dispatch => {
  return {
    setTransactions: transactions => dispatch(setTransactions(transactions))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
