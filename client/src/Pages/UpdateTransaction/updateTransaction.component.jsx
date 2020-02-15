import React from 'react';
import './updateTransaction.component.sass';
import moment from 'moment';

class UpdateTransaction extends React.Component {
  render() {
    const {transaction} = this.props;
    return(
      <div className="updateTransaction">
        <p>id: {transaction._id}</p>
        <p>amount: {transaction.amount.$numberDecimal}</p>
        <p>date: {moment(transaction.date).format('MM/DD/YYYY')}</p>
        <p>isDebit: {transaction.isDebit}</p>
        <p>memo: {transaction.memo}</p>
        <p>payee: {transaction.payee.name}</p>
      </div>
    )
  }
}

export default UpdateTransaction;