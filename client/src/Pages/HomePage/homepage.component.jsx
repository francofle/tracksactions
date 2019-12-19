import React from 'react';
import { connect } from 'react-redux';
import AccountSummary from "../../Components/AccountSummary/accountSummary.component";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user.selectors";

const HomePage = ({currentUser}) => {
  return (
    <div>
      <AccountSummary currentUser={currentUser}/>
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})


export default connect(mapStateToProps)(HomePage);