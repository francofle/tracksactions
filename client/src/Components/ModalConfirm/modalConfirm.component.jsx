import React from 'react';
import './modalConfirm.styles.sass';
import moment from 'moment';
import { separateNumbersWithComma } from '../../utils/utilities';

const ModalConfirm = (props) => {
  const onClose = event => {
    props.onClose && props.onClose(event);
  };

  if (!props.show) {
    return null;
  }
  const {
    title,
    body,
    transaction,
    onDelete
  } = props;

  return (
    <div className='modalConfirmContainer container-fluid position-fixed'>
      <div className='row'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title'>{title}</h5>
          </div>
          <div className='modal-body'>
            <p className='modalText'>{body}</p>
            <p className='modalTrx'>Date: {moment(transaction.trxDate).format('MM/DD/YYYY')}</p>
            <p className='modalTrx'>Payee: {transaction.trxPayee}</p>
            <p className='modalTrx'>
              Amount: {transaction.trxType === 'true' ? '-' : ''}$ {separateNumbersWithComma(transaction.trxAmount)}
            </p>
          </div>
          <div className='modal-footer'>
            <button onClick={event => onClose(event)} className='closeButton'>
              Close
            </button>
            <button onClick={() => onDelete(props.transaction)} className='deleteButton'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
