import React, {useState} from "react";
import {default as apiurlbase} from '../apiurlbase';
import './AddKey.css';

/**
 * Component to create keys
 * 
 * Required props: none
 * 
 * Accepted props: none
 * 
 * @author Han Kuo
 * @author Quincy Powell <Quincy.Powell@gmail.com>
 */
export default function AddKey () {
  // event handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    
    //let strUrl = apiurlbase + 
  }
  const handleCancel = (event) => {
    //ToDo: implement cancellation
  }
  // form data states
  const [keybundleId, setKeybundleId] = useState(null);
  const [keybundleStatus, setKeybundleStatus] = useState(null);
  const [keybundlePropertyId, setKeybundlePropertyId] = useState(null);
  const [keybundleKeyholderId, setKeybundleKeyholderId] = useState(null);

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <legend>Add a key</legend>
        <label>
          Key ID (tag):
          <input type="number" value={keybundleId}
            onChange={(event) => setKeybundleId(event.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="number" value={keybundleStatus}
            onChange={(event) => setKeybundleStatus(event.target.value)} />
        </label>
        <br />
        <label>
          Property:
          <input type="number" value={keybundlePropertyId}
            onChange={(event) => setKeybundlePropertyId(event.target.value)} />
        </label>
        <br />
        <label>
          Keyholder:
          <input type="number" value={keybundleKeyholderId}
            onChange={(event) => setKeybundleKeyholderId(event.target.value)} />
        </label>
        <br />
        <input type="submit" value="Create Key" />
        <input type="button" value="Cancel"
          onClick={handleCancel} />
      </form>
    </div>
  );
}