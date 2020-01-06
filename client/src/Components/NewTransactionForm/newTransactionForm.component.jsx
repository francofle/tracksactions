import React from "react";
import "./newTrasnactionForm.styles.sass";
import moment from "moment";

class NewTransactionForm extends React.Component {
  state = {
    date: moment().format("MM/DD/YYYY"),
    payee: "Payee",
    trxAmount: 19.99
  };

  render() {
    return (
      <div className="newTrxFormContainer">
        <div className='newTrxFormTitleContainer'>
          <h1 className="newTransactionFormTitle">New Transaction</h1>
        </div>

        <form className="newTransactionForm">
          <div className="rowContainer">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Date</span>
                </div>
                <input
                  className="trxDate"
                  type="date"
                  placeholder={this.state.date}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className='input-group-text'>Payee:</span>
                  <input
                    className="trxPayee"
                    id="trxPayee"
                    type="text"
                    placeholder={this.state.payee}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className='input-group'>
                <div className="input-group-prepend">
                  <span className='input-group-text'>Amount ($)</span>
                  <input
                    id="trxAmount"
                    className="trxAmount"
                    type="number"
                    min="0.00"
                    step="0.01"
                    value="19.99"
                  />
                </div>
                </div>
              </div>
          </div>
          <div className="rowContainer">
            <div className="from-group trxMemoFormGroup">
              <div className="input-group">
                <div className="input-group-prepend trxMemoInput">
                  <span className="input-group-text">Memo:</span>
                  <input type="text" className='trxMemo w-100'/>
                </div>
              </div>
            </div>
          </div>
          <div className="debitCreditSelectContainer">
            <label htmlFor="trxType">Transaction Type:</label>
            <select name="trxType" id="trxType">
              <option disabled selected>Choose one...</option>
              <option value="debit">Expense</option>
              <option value="credit">Income</option>
            </select>
          </div>
          <button type='submit' className='addTrxButton'>Add Transaction</button>
        </form>
      </div>
    );
  }
}

export default NewTransactionForm;
