import React, {useState} from "react";
// import FormAddKey from "./FormAddKey";
// import AddProperty from "./AddProperty";


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
    //ToDo: implement API call
  }
  const handleCancel = (event) => {
    //ToDo: implement cancellation
  }
  // form data states
  const [keybundleId, setKeybundleId] = useState(0);
  const [keybundleStatus, setKeybundleStatus] = useState(0);
  const [keybundlePropertyId, setKeybundlePropertyId] = useState(0);
  const [keybundleKeyholderId, setKeybundleKeyholderId] = useState(0);

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <legend>Add a key</legend>
        <label>
          Key ID (tag):
          <input type="number" 
            onChange={(event) => setKeybundleId(event.target.value)} />
        </label>
        <br />
        <label>
          Status:
          <input type="number" 
            onChange={(event) => setKeybundleStatus(event.target.value)} />
        </label>
        <br />
        <label>
          Property:
          <input type="number" 
            onChange={(event) => setKeybundlePropertyId(event.target.value)} />
        </label>
        <br />
        <label>
          Keyholder:
          <input type="number" 
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