import React, {useState} from 'react';
import './AddKeyholder.css'
import {default as apiurlbase} from '../apiurlbase'

export default function AddKeyholder () {
  const createKeyholder = (
    firstName,
    lastName,
    email,
    telephone,
    keyholderType
  ) => {
    let strUrl = apiurlbase + 'keyholder';
    let strData = JSON.stringify({
      'first_name': firstName,
      'last_name': lastName,
      'email': email,
      'phone': telephone,
      'keyholder_type': keyholderType
    });
    let formData = new FormData();
    formData.append('json', strData);
    let fetchInit = {
      method: 'POST',
      body: formData
    }

    fetch(strUrl, fetchInit)
      .then(res => res.json())
      .then(data => {console.log('POST result: ', data)})
      .catch(error => {console.error('POST failed: ', error)});
  }

  // event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    createKeyholder(
      firstName,
      lastName,
      email,
      telephone,
      keyholderType
    );
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
        <input type="button" value="Cancel" onClick={handleCancel} />
      </form>
    </div>
  );
}