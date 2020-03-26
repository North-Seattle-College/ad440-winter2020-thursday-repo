import React, { useState } from "react";
import { default as apiurlbase } from "../apiurlbase";
import "./AddKey.css";

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
export default function AddKey() {
  const createKey = (
    keybundleId, // WTF API?
    keybundleStatusId,
    propertyId,
    keyholderId = 1, // assume in office whan not overridden
    keybundleCheckoutDate = null,
    keybundleDueDate = null
  ) => {
    let strUrl = apiurlbase + "property/" + propertyId + "/keybundle";
    let strData = JSON.stringify({
      keybundle_id: keybundleId,
      keybundle_status_id: keybundleStatusId,
      property_id: propertyId,
      keyholder_id: keyholderId,
      keybundle_checkout_date: keybundleCheckoutDate,
      keybundle_due_date: keybundleDueDate
    });
    let formData = new FormData();

    //Set up the fetch in different way
    // fetch(strUrl,{
    //     method: 'post',
    //     body:formData
    // }).then(function(response){
    //     return response.text();
    // }).then(function(text){
    //     console.log(text)
    // }).catch(function(error){
    //   console.error(error);
    // })

    formData.append("json", strData);
    let fetchInit = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: formData
    };

    fetch(strUrl, fetchInit)
      .then(res => res.json())
      .then(data => {
        console.log("POST success: ", data);
      })
      .catch(error => {
        console.error("POST failed: ", error);
      });
  };

  // event handlers
  const handleSubmit = event => {
    event.preventDefault();
    createKey(
      keybundleId,
      keybundleStatusId,
      keybundlePropertyId,
      keybundleKeyholderId
    );
  };
  const handleCancel = event => {
    //ToDo: implement cancellation
  };
  // form data states
  const [keybundleId, setKeybundleId] = useState(null);
  const [keybundleStatusId, setKeybundleStatusId] = useState(null);
  const [keybundlePropertyId, setKeybundlePropertyId] = useState(null);
  const [keybundleKeyholderId, setKeybundleKeyholderId] = useState(null);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend>Add a key</legend>
        <label>
          Key ID (tag):
          <input
            type="number"
            value={keybundleId}
            onChange={event => setKeybundleId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="number"
            value={keybundleStatusId}
            onChange={event => setKeybundleStatusId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Property:
          <input
            type="number"
            value={keybundlePropertyId}
            onChange={event => setKeybundlePropertyId(event.target.value)}
          />
        </label>
        <br />
        <label>
          Keyholder:
          <input
            type="number"
            value={keybundleKeyholderId}
            onChange={event => setKeybundleKeyholderId(event.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Create Key" />
        <input type="button" value="Cancel" onClick={handleCancel} />
      </form>
    </div>
  );
}
