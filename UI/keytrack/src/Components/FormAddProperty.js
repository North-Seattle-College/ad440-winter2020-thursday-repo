import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class FormAddProperty extends Component {
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
            hintText="ID"
            floatingLabelText="ID"
            onChange={handleChange("id")}
            defaultValue={values.id}
          />
          <br />
          <TextField
            hintText="Name"
            floatingLabelText="Name"
            onChange={handleChange("name")}
            defaultValue={values.name}
          />
          <br />
          <TextField
            hintText="Address"
            floatingLabelText="Address"
            onChange={handleChange("address")}
            defaultValue={values.address}
          />
          <br />
          <TextField
            hintText="City"
            floatingLabelText="City"
            onChange={handleChange("city")}
            defaultValue={values.city}
          />
          <br />
          <TextField
            hintText="State"
            floatingLabelText="State"
            onChange={handleChange("state")}
            defaultValue={values.state}
          />
          <br />
          <TextField
            hintText="Zip"
            floatingLabelText="Zip"
            onChange={handleChange("zip")}
            defaultValue={values.zip}
          />
          <br />
          <br />
          <TextField
            hintText="Country"
            floatingLabelText="Country"
            onChange={handleChange("country")}
            defaultValue={values.country}
          />
          <br />
          <TextField
            hintText="Type"
            floatingLabelText="Type"
            onChange={handleChange("type")}
            defaultValue={values.type}
          />

          <RaisedButton
            label="Submit"
          //  primary={true}
          //  styles={styles.button}
          //  onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            styles={styles.button}
            onClick={this.back}
          />

        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default FormAddProperty;

const styles = {
  button: {
    margin: 50
  }
};
