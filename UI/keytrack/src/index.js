import React from "react";
import AddUserForm from "./AddUserForm";

class AddUserPage extends React.Component {
  submit = values => {
    // print the form values to the console
    console.log(values);
  };
  render() {
    return <AddUserForm onSubmit={this.submit} />;
  }
}
