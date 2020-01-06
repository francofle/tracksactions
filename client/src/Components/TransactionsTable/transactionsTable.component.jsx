import React from "react";
import "./transactionsTable.styles.sass";
import { Link } from "react-router-dom";

const TransactionsTable = () => {
  return (
    <div className="transactionsTableContainer">
      <div className="transactionsTableDiv">
        <Link to="/newTransaction" className="newTransactionBtn">
          <p className="addSign">+</p>
        </Link>
        <h1>Transactions</h1>
      </div>
    </div>
  );
};

export default TransactionsTable;
