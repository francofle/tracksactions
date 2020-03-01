import React from "react";
import "./accountSummary.styles.sass";
import ProfilePic from "../ProfilePic/profilePic.component";
import {separateNumbersWithComma} from "../../utils/utilities";

const AccountSummary = ({currentUser}) => {

  return (
    <div className="accountSummary">
      <div className="profileImgContainer">
        <ProfilePic profileImg={'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3578&q=80'}/>
      </div>
        <div className="accountSummaryBalance">
          <p>Hello <b>{currentUser.name}</b>, your current balance is:</p>
          <h1><span className='balance'>${!currentUser.totalBalance ? 0.00 : separateNumbersWithComma(currentUser.totalBalance.$numberDecimal)}</span></h1>
        </div>
    </div>
  );
};

export default AccountSummary;
