import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
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
      <MuiThemeProvider >
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
          
          <br />
          <RaisedButton
            label="Continue"
            primary={true}
            styles={styles.button}
            onClick={this.continue}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormAddKey;

const styles = {
  button: {
    margin: 50
  }
};
