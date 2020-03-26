import React from 'react';
import './SelectPropertyModal.css';

export default function SelectPropertyModal (props) {
console.log(props.allProperties);
  const makeButton = (property, i) => {
    return(
      <button key={'kh'+property.property_id} onClick={() => props.onSelect(property)}>
        {`${property.property_name} ${property.property_address}`}
      </button>
    );
  }
  
  return (
    <div className={'modal-backdrop'} onClick={props.onClose}>
      <div className={'modal-body'} onClick={e => e.stopPropagation()}>
        {/* {console.log(Array.isArray(props.allProperties))} */}
        {props.allProperties.allProperties.map(makeButton)}
      </div>
    </div>
  );
}