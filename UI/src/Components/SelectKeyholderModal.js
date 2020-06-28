import React from 'react';
import './SelectKeyholderModal.css';

export default function SelectKeyholderModal (props) {
  const makeButton = (keyholder, i) => {
    return(
      <button key={'kh'+keyholder.keyholder_id} onClick={() => props.onSelect(keyholder)}>
        {`${keyholder.first_name} ${keyholder.last_name}`}
      </button>
    );
  }
  return (
    <div className={'modal-backdrop'} onClick={props.onClose}>
      <div className={'modal-body'} onClick={e => e.stopPropagation()}>
      {props.allKeyholders.map(makeButton)}
      </div>
    </div>
  );
}