import React, { Component } from "react";
//import MuiThemeProvider from "material-ui/styels/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class FormAddKey extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };
  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <React.Fragment>
        <TextField
          hintText="Enter Id"
          floatingLabelText="ID"
          onChange={handleChange("id")}
          defaultValue={values.id}
        />
        <br />
        <TextField
          hintText="Enter Property"
          floatingLabelText="Property"
          onChange={handleChange("property")}
          defaultValue={values.property}
        />
        />
        <br />
        <RaisedButton
          label="Continue"
          primary={true}
          styles={styles.button}
          onClick={this.continue}
        />
      </React.Fragment>
    );
  }
}

export default FormAddKey;

const styles = {
  button: {
    margin: 50
  }
};
