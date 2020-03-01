import React from 'react';
import './updateTransaction.component.sass';
import moment from 'moment';
import FormInput from '../../Components/FormInput/formInput.component';
import API from '../../utils/API';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTotalBalance } from '../../redux/user/user.actions';
import { auth } from '../../firebase/firebase.utils';

class UpdateTransaction extends React.Component {
  state = {
    trxDate: '',
    trxAmount: null,
    trxPayee: '',
    trxMemo: '',
    trxType: '',
    origTrxDate: '',
    origTrxAmount: '',
    origTrxPayee: '',
    origTrxMemo: '',
    origTrxType: '',
    errorMessage: '',
    edited: false
  };
  componentDidMount() {
    const { transactionId } = this.props.match.params;
    const { token } = this.props.currentUser;

    this.fetchTransaction(transactionId, token).then(transaction => {
      if (!transaction) {
        this.setState({
          trxAmount: null
        });
      } else if (transaction.message) {
        let errorMessage = '';
        if (transaction.name === 'auth') {
          errorMessage = `Error: ${transaction.message}`;
        } else {
          errorMessage = 'Error fetching transaction';
        }
        this.setState({ amount: '', errorMessage });
      } else {
        const {
          date,
          amount: { $numberDecimal },
          payee: { name },
          memo,
          isDebit
        } = transaction;
        this.setState({
          trxDate: moment.parseZone(date).format('YYYY-MM-DD'),
          trxPayee: name,
          trxAmount: $numberDecimal,
          trxMemo: memo,
          trxType: isDebit,
          origTrxDate: moment.parseZone(date).format('YYYY-MM-DD'),
          origTrxPayee: name,
          origTrxAmount: $numberDecimal,
          origTrxMemo: memo,
          origTrxType: isDebit
        });
      }
    });
  }

  fetchTransaction = async (transactionId, token) => {
    try {
      const response = await API.findTransactionById(transactionId, token);
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  handleInputChange = event => {
    const { name } = event.target;
    let { value } = event.target;

    const origTrxState = `orig${name.charAt(0).toUpperCase() + name.slice(1)}`;

    if (name === 'trxDate') {
      // TODO: check date format and convert to moment
    }

    if (name === 'trxType') {
      value = value === 'expense';
    }

    if (value !== this.state[origTrxState]) {
      this.setState({
        [name]: value,
        edited: true
      });
    } else {
      this.setState({
        [name]: value,
        edited: false
      });
    }
  };

  onBackButtonPressed = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  handleInputFocusOut = event => {
    const { name } = event.target;
    let { value } = event.target;

    // TODO: Validate and format amount before setting state
    if (name === 'trxAmount' && value > 0) {
      this.setState({
        [name]: parseFloat(value).toFixed(2)
      });
    }
  };

  handleClick = event => {
    event.preventDefault();
    const {
      trxDate,
      trxPayee,
      trxAmount,
      trxMemo,
      trxType,
      origTrxAmount,
      origTrxType
    } = this.state;
    const { token } = this.props.currentUser;


    if (event.target.name === 'cancelUpdate') {
      return this.props.history.goBack();
    }

    if (event.target.name === 'updateTransactionButton') {
      const { transactionId } = this.props.match.params;
      const { mongoId } = this.props.currentUser;

      let difference = parseFloat(trxAmount) - parseFloat(origTrxAmount);
      if (trxType !== origTrxType && difference === 0) {
        difference = parseFloat(origTrxAmount)*2;
      } else if (origTrxType !== trxType && difference !== 0) {
        difference = (parseFloat(origTrxAmount)*2) + parseFloat(difference);
      }

      const transaction = {
        date: trxDate,
        amount: trxAmount,
        payee: trxPayee,
        memo: trxMemo,
        isDebit: trxType,
        difference: difference
      };

      API.updateTransactionById(transactionId, token, transaction, mongoId)
        .then(response => response.json())
        .then(data => this.props.setTotalBalance(data.totalBalance.$numberDecimal))
        .finally(() => this.props.history.push('/'));
    }
  };

  render() {
    const { trxDate, trxPayee, trxAmount, trxMemo, trxType } = this.state;

    return (
      <div className='updateTransactionContainer'>
        <div className='container-fluid p-0'>
          <div className='pageTitleContainer row'>
            <div className='col-1 backButtonContainer'>
              <button className='backButton' onClick={this.onBackButtonPressed}>
                &#10094;
              </button>
            </div>
            <div className='col-11 title'>
              <h1>Update Transaction</h1>
            </div>
          </div>
        </div>
        {trxAmount === null ? (
          <div className='container-fluid h-100 errorContainer'>
            <div className='row'>
              <div className='col-12' onLoad={() => setTimeout(() => auth.signOut(), 3)}>
                {this.state.errorMessage}
              </div>
            </div>
          </div>
        ) : (
          <form className='updateTransactionForm container-fluid'>
            <div className='row w-100'>
              <div className='col-sm-3 col-xs-12 my-1'>
                <FormInput
                  type='date'
                  name='trxDate'
                  label='Date'
                  value={trxDate}
                  handleChange={this.handleInputChange}
                  placeholder={trxDate}
                  required
                />
              </div>

              <div className='col-xs-12 col-sm-6 my-1'>
                <FormInput
                  id='trxPayee'
                  type='text'
                  name='trxPayee'
                  label='Payee'
                  value={trxPayee}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className='col-sm-3 col-xs-12 my-1'>
                <FormInput
                  id='trxAmount'
                  name='trxAmount'
                  type='number'
                  min='0.00'
                  step='any'
                  inputMode='decimal'
                  value={trxAmount}
                  label='Amount ($)'
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputFocusOut}
                />
              </div>
            </div>
            <div className='row w-100'>
              <div className='col-12 my-1'>
                <FormInput
                  type='text'
                  name='trxMemo'
                  label='Memo'
                  value={trxMemo}
                  handleChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className='debitCreditSelectContainer'>
              <label htmlFor='trxType'>Transaction Type:</label>
              <select
                name='trxType'
                id='trxType'
                onChange={this.handleInputChange}
                defaultValue={trxType ? 'expense' : 'income'}
              >
                <option value='expense'>Expense</option>
                <option value='income'>Income</option>
              </select>
            </div>
            <div className='updateTransactionButtonsContainer row'>
              <button
                className={`updateTransactionButton ${!this.state.edited ? 'disabledButton' : ''}`}
                name='updateTransactionButton'
                onClick={this.handleClick}
                disabled={!this.state.edited}
              >
                Update
              </button>
              <button className='cancelTrxButton' onClick={this.handleClick} name='cancelUpdate'>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setTotalBalance: totalBalance => dispatch(setTotalBalance(totalBalance))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UpdateTransaction)
);
