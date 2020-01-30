import React from 'react';
import './homepage.styles.sass';
import { connect } from 'react-redux';
import AccountSummary from '../../Components/AccountSummary/accountSummary.component';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import TransactionsTable from '../../Components/TransactionsTable/transactionsTable.component';
import {selectAllTransactions} from "../../redux/transaction/transaction.selectors";
import {setTransactions} from "../../redux/transaction/transaction.actions";

class HomePage extends React.Component {

  componentDidMount() {
    const {firebaseId, token} = this.props.currentUser;
    console.log('Component did mount: ');
    console.log(typeof token);
    this.fetchTransactions(firebaseId, token);
  }

  fetchTransactions = (firebaseId, token) => {
    // todo: redux thunk this. async it
    const {setTransactions} = this.props;
    fetch(`/api/users/${firebaseId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setTransactions(data.transactions))
      .catch(error => console.log(error));
  };
  render() {
    const {currentUser} = this.props;


    return (
      <div className='homepage'>
        <AccountSummary currentUser={currentUser} />
        <TransactionsTable transactions={this.props.transaction ? this.props.transaction.transactions : null}/>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
