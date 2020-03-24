import React, {useState} from 'react';
import './AddKeyholder.css'
import {default as apiurlbase} from '../apiurlbase'

export default function AddKeyholder () {
  // event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    //ToDo: implement DB update using API
  }
  const handleCancel = (event) => {
    //ToDo: implement cancellation
  }
  // form data states
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [telephone, setTelephone] = useState(null);
  const [keyholderType, setKeyholderType] = useState(null);

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <legend>Add a person</legend>
        <label>
          First Name:
          <input type="text" value={firstName}
            onChange={(event) => setFirstName(event.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName}
            onChange={(event) => setLastName(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email}
            onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Telephone:
          <input type="tel" value={telephone}
            onChange={(event) => setTelephone(event.target.value)} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" value={keyholderType}
            onChange={(event) => setKeyholderType(event.target.value)} />
        </label>
        <br />
        <input type="submit" value="Add person to DB" />
        <input type="button" value="Cancel" onclick={handleCancel} />
      </form>
    </div>
  );
}