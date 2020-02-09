import React, { Component } from "react";

class AddUser extends Component {
  // ojbect that track all the components that the AddUser needs
  state = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    keyholder_type_id: 0,
    heyholder_type: ''
  };

  render() {
    return (
      <React.Fragment>
        <span>{this.state.addUser}</span>
        <button>Create User</button>
      </React.Fragment>
    );
    // end of return

    formatAddUserInfo() {
      const {first_name } = this.state
      return first_name === '' ? 'Blank' : first_name;
  //    return this.state.last_name === '' ? 'Blank' : this.state.last_name;
  //    return this.state.email === '' ? 'Blank' : this.state.email;
  //    return this.state.phone === '' ? 'Blank' : this.state.phone;
  //    return this.state.keyholder_type_id === 0 ? 'Blank' : this.state.keyholder_type_id;
  //    return this.state.keyholder_type === '' ? 'Blank' : this.state.keyholder_type;
    }
       // end of formatAddUser
  }
     // end of render
}
export default AddUser;
