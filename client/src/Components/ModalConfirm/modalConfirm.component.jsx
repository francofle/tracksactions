import React from 'react';
import './modalConfirm.styles.sass';
import moment from 'moment';
import { separateNumbersWithComma } from '../../utils/utilities';

class ModalConfirm extends React.Component {
  onClose = event => {
    this.props.onClose && this.props.onClose(event);
  };

  render() {
    if (!this.props.show) {
      return null;
    }
    const {
      transaction: { trxDate, trxPayee, trxAmount, trxType }
    } = this.props;
    return (
      <div className='modalConfirmContainer container-fluid position-fixed'>
        <div className='row'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{this.props.title}</h5>
            </div>
            <div className='modal-body'>
              <p className='modalText'>{this.props.body}</p>
              <p className='modalTrx'>Date: {moment(trxDate).format('MM/DD/YYYY')}</p>
              <p className='modalTrx'>Payee: {trxPayee}</p>
              <p className='modalTrx'>
                Amount: {trxType === 'true' ? '-' : ''}$ {separateNumbersWithComma(trxAmount)}
              </p>
            </div>
            <div className='modal-footer'>
              <button onClick={event => this.onClose(event)}>Close</button>
              <button onClick={event => this.onClose(event)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalConfirm;
