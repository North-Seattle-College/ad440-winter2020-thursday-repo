import React, {useRef} from "react";
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
  // refs for form data
  const keybundleId = useRef();
  const keybundleStatus = useRef();
  const keybundlePropertyId = useRef();
  const keybundleKeyholderId = useRef();

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <legend>Add a key</legend>
        <label>
          Key ID (tag):
          <input type="number" ref={keybundleId} />
        </label>
        <br />
        <label>
          Status:
          <input type="number" ref={keybundleStatus} />
        </label>
        <br />
        <label>
          Property:
          <input type="number" ref={keybundlePropertyId} />
        </label>
        <br />
        <label>
          Keyholder:
          <input type="number" ref={keybundleKeyholderId} />
        </label>
        <br />
        <input type="submit" value="Create Key" />
        <input type="button" value="Cancel"
          onClick={handleCancel} />
      </form>
    </div>
  );
}