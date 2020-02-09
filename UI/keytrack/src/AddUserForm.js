import { createStore, combineReducers } from "./redux/src";
import { reducer as formReducer } from "./redux-form/src";
import React from "react";
import { Field, reduxForm } from "./redux-form/src";
// end imports

//  ****** Program Objective:  Create a UI that adds a new user to the Key Controller database
//  ****** Inputs:   User first name, Last Name, Role, Email, Phone
//  ******           User Roles will be retrieved from the user role table and displayed as a drop down option list
//  ******           But for now are hard coded
//  ****** Date Created:  20200208
//  ****** Developer:   Karen Petersen
//  ******
//  ******************************************************* Change Log ****************************************************
//  Date       Developer       Change
// *************************************************************************************************************************
//  20200208   Karen Petersen  Created new component.  Added constants, variables, drop down list and buttons, per reduct examples.
//  20200209   Karen Petersen  Still unable to get compile to complete.  Files within the redux-form library are crashing
//                             the compile.  Will upload what I have to remote github and ask team for help.
// *************************************************************************************************************************

//The store should know how to handle actions coming from the form components.
// To enable this, we need to pass the formReducer to your store.
// It serves for all of your form components, so you only have to pass it once.
const rootReducer = combineReducers({
  // ...your other reducers here
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer
});

const store = createStore(rootReducer);

let AddUserForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Field name="email" component="input" type="email" />
      </div>
      <div>
        <label>Phone</label>
        <div>
          <Field
            name="phone"
            component="input"
            type="phone"
            placeholder="Phone"
          />
        </div>
      </div>
      <div>
        <label>Role</label>
        <div>
          <Field name="role" component="select">
            <option />
            <option value="Property Manager">Property Manager</option>
            <option value="Agent">Agent</option>
            <option value="Vendor">Vendor</option>
            <option value="Admin">Admin</option>
          </Field>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

AddUserForm = reduxForm({
  // a unique name for the form
  form: "addUser"
})(AddUserForm);

// create new, "configured" function
// createReduxForm = reduxForm({ form: "addUser" });
// evaluate it for AddUserForm component
// AddUserForm = createReduxForm(AddUserForm);

export default AddUserForm;
