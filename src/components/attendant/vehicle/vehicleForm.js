import React, { Component, Fragment } from "react";
import { addVehicle } from "../../../redux/actions/dataActions";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import EditDialog from "../ui/edit/editDialog";

const styles = (theme) => ({
  ...theme.spreadThese,
});

class Vehicle extends Component {
  
    state = {
      registration: "",
      display: "inline",
      model: "",
      engine: "",
      errors: {},
      loading: false,
      vehicle: {},
    };
  





  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors, loading: false });
    }

    const getLength = (obj) => {
      return Object.keys(obj).length
    }
    console.log(getLength(nextProps.data.vehicle))

    if (getLength(nextProps.data.vehicle)> 2) {
      this.setState({ loading: false, vehicle: nextProps.data.vehicle,display: "none" });

    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const vehicleData = {
      model: this.state.model,
      registration: this.state.registration,
      engine: this.state.engine,
    };
    this.props.addVehicle(
      vehicleData,
      this.props.customerId,
      this.props.attendant,
      // this.props.name
    );
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      // UI: { loading },
      customerId,
      attendant,
      name,
      email,
      phone,
      
    } = this.props;
    
    const { customer } = this.props.data;
    const errors = this.state.errors;
    const { vehicleCount } = customer;
    
    const { vehicle,display } = this.state;
    console.log(vehicle)
    const getLength = (obj) => {
      return Object.keys(obj).length
    }
    
    return (
      <Fragment>
        {getLength(vehicle) > 2 ? (
          <Fragment>
            <Alert severity="success">
              Successfully — Added {vehicle.model} for {name}{" "}
            </Alert>

            <EditDialog
              customerId={customerId}
              attendant={attendant}
              openDialog={this.props.openDialog}
              name={name}
              phone={phone}
              // createdAt={createdAt}
              vehicleCount={vehicleCount}
              email={email}
            />
          </Fragment>
        ) : (
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid>
              <Grid item container direction="row">
                <Grid item xs={12} sm={4}>
                  <Box p={1} m={1} bgcolor="background.paper">
                    <TextField
                      id="model"
                      name="model"
                      type="text"
                      label="Model"
                      className={classes.textField}
                      value={this.state.model}
                      onChange={this.handleChange}
                      helperText={errors.model}
                      error={errors.model ? true : false}
                      // variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box p={1} m={1} bgcolor="background.paper">
                    <TextField
                      id="registration"
                      name="registration"
                      type="registration"
                      label="Registration"
                      className={classes.textField}
                      value={this.state.registration}
                      onChange={this.handleChange}
                      helperText={errors.registration}
                      error={errors.registration ? true : false}

                      // variant="outlined"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box p={1} m={1} bgcolor="background.paper">
                    <TextField
                      id="engine"
                      name="engine"
                      type="engine"
                      label="Engine"
                      className={classes.textField}
                      value={this.state.engine}
                      onChange={this.handleChange}
                      helperText={errors.engine}
                      error={errors.engine ? true : false}

                      // variant="outlined"
                    />
                  </Box>
                </Grid>

                <br />
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Grid item sm={12}>
                  <Box p={1} m={1} bgcolor="background.paper"
                  display={display}
                  >
                    <Button
                      // variant="outlined"
                      type="submit"
                      variant="contained"
                      id="button"
                      color="primary"
                      className={classes.button}
                      disabled={this.state.loading}
                    >
                      Add Vehicle
                      {this.state.loading && (
                        <CircularProgress
                          size={30}
                          className={classes.progress}
                          // className="secondary"
                          disableShrink
                        />
                      )}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Fragment>
    );
  }
}

Vehicle.propTypes = {
  addVehicle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { addVehicle })(
  withStyles(styles)(Vehicle)
);
