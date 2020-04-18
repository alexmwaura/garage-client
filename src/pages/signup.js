import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/calltronix.jpg";
import DownIcon from "../images/down.jpg";

import ImageIcon from "../images/more.jpg";
import MenuItem from "@material-ui/core/MenuItem";
// import GarageIcon from "../images/garage.jpg";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
// import axios from "axios";
import { signupUser } from "../redux/actions/userActions";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadThese,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      role: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  // componentDidMount(nextProps){
  //   if(nextProps.UI.errors){
  //     this.setState({errors: nextProps.UI.errors })
  //   }
  // }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
      role: this.state.role,
    };

    this.props.signupUser(newUserData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <div className="main-panel" id="main-panel">
        <div className="panel-header panel-header-sm"></div>
        <div className="content">
          <div className="rows">
            <div className="col-md-6" id="col">
              <div className="container">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title"> Signup</h4>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <Grid container className={classes.form}>
                        <Grid item sm={6}  id="cf">
                          <div className={classes.image}>
                            <img
                              src={DownIcon}
                              alt="garage"
                              className="bottom"
                            />

                            <img
                              src={ImageIcon}
                              alt="calltronix"
                              className="top"
                            />
                          </div>
                          <br />
                          <br />

                          <Typography
                            className={classes.pageTitle}
                            variant="h4"
                          >
                            {/* <img src={AppIcon} alt="calltronix" className="icon" /> */}
                          </Typography>
                          <br />
                          <form noValidate onSubmit={this.handleSubmit}>
                            <TextField
                              id="email"
                              name="email"
                              type="email"
                              label="Email"
                              className={classes.textField}
                              // variant="outlined"
                              value={this.state.email}
                              onChange={this.handleChange}
                              helperText={errors.email}
                              error={errors.email ? true : false}
                              fullWidth
                            />

                            <TextField
                              id="username"
                              name="username"
                              type="text"
                              label="Username"
                              className={classes.textField}
                              // variant="outlined"
                              value={this.state.username}
                              onChange={this.handleChange}
                              helperText={errors.username}
                              error={errors.username ? true : false}
                              // fullWidth
                            />
                            <hr />
                            <InputLabel id="label">
                              Choose Account
                              {errors.role && (
                                <Typography
                                  variant="body2"
                                  className={classes.customError}
                                >
                                  {errors.role}
                                </Typography>
                              )}
                            </InputLabel>
                            <br />
                            <Select
                              labelId="label"
                              value={this.state.role}
                              fullWidth
                              onChange={this.handleChange}
                              name="role"
                              variant="outlined"
                              error={errors.role ? true : false}
                            >
                              <MenuItem value="attendant">Attendant</MenuItem>
                              <MenuItem value="mechanic">Mechanic</MenuItem>
                            </Select>

                            <TextField
                              id="password"
                              name="password"
                              type="password"
                              label="Password"
                              className={classes.textField}
                              value={this.state.password}
                              onChange={this.handleChange}
                              fullWidth
                              // variant="outlined"
                              helperText={errors.password}
                              error={errors.password ? true : false}
                            />

                            <TextField
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              label="Confirm Password"
                              className={classes.textField}
                              value={this.state.confirmPassword}
                              onChange={this.handleChange}
                              helperText={errors.confirmPassword}
                              error={errors.confirmPassword ? true : false}
                              // fullWidth
                              // variant="outlined"
                            />
                            <br />
                            <br />
                            {errors.general && (
                              <Typography
                                variant="body2"
                                className={classes.customError}
                              >
                                {errors.general}
                              </Typography>
                            )}

                            <Button
                              // variant="outlined"
                              type="submit"
                              variant="contained"
                              color="secondary"
                              className={classes.button}
                              id="button"
                              disabled={loading}
                            >
                              Signup
                              {loading && (
                                <CircularProgress
                                  size={30}
                                  className={classes.progress}
                                  // className="secondary"
                                  disableShrink
                                />
                              )}
                            </Button>
                            <br />
                            <hr />
                            <small className="">
                              Already have an account ? Login{" "}
                              <Link to="/login">here</Link>
                            </small>
                            <br />
                            <img
                              src={AppIcon}
                              alt="calltronix"
                              className="img-fluid"
                            />
                          </form>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
// console.log()

export default connect(mapStateToProps, { signupUser })(
  withStyles(styles)(signup)
);
