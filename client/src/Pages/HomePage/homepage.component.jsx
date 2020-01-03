import React from 'react';
import './homepage.styles.sass'
import { connect } from 'react-redux';
import AccountSummary from "../../Components/AccountSummary/accountSummary.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import TransactionsTable from "../../Components/TransactionsTable/transactionsTable.component";

const HomePage = ({currentUser}) => {
  return (
    <div className='homepage'>
      <AccountSummary currentUser={currentUser}/>
      <TransactionsTable />
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});


export default connect(mapStateToProps)(HomePage);