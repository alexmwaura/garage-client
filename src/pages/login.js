import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/calltronix.jpg";
import DownIcon from "../images/down.jpg";
import ImageIcon from "../images/more.jpg";

// import GarageIcon from "../images/garage.jpg";

import { Link } from "react-router-dom";

// MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  ...theme.spreadThese,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history);
  };
  datadata;
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
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title"> Login</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Grid container className={classes.form}>
                      <Grid item sm={6} className="form" id="cf">
                        <div className="image">
                          <img src={DownIcon} alt="garage" className="bottom" />

                          <img
                            src={ImageIcon}
                            alt="calltronix"
                            className="top"
                          />
                        </div>

                        <form noValidate onSubmit={this.handleSubmit}>
                          <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            fullWidth
                            value={this.state.email}
                            onChange={this.handleChange}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            // variant="outlined"
                          />
                          <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            helperText={errors.password}
                            error={errors.password ? true : false}

                            // variant="outlined"
                          />

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
                            id="button"
                            color="secondary"
                            className={classes.button}
                            disabled={loading}
                          >
                            Login
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
                            Don't have an account ? Signup{" "}
                            <Link to="/signup" className="link">
                              here
                            </Link>
                          </small>
                          <br />
                          <img
                            src={AppIcon}
                            alt="calltronix"
                            // className="icon "
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
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
// console.log()

export default connect(mapStateToProps, { loginUser })(
  withStyles(styles)(login)
);
