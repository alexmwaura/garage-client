import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { clearErrors } from "../../redux/actions/dataActions";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "@material-ui/core/Icon";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Grid from "@material-ui/core/Grid";
import CheckIcon from '@material-ui/icons/Check';

const styles = (theme) => ({
  ...theme.spreadThese,
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    textAlign: 'center'
  },
  table: {
    minWidth: 100,
  },
});

class customerForm extends Component {
  state = {
    open: "none",
    disabled: false,
    name: "",
    email: "",
    phone: "",
  };

  componentDidMount = () => {
    if (this.props.newCustomer) {
      this.handleOpen();
    }
  };

  handleOpen = () => {
    this.setState({ open: "inline", disabled: true });
  };
  handleClose = () => {
    this.setState({ open: "none", disabled: false });
    this.props.clearErrors();
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handlePhoneChange = (value) => {
    this.setState(
      {
        [this.state.phone]: value,
      },
      () => {
        console.log(this.state.phone);
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const userData = {
      email: this.state.email,
      name: this.state.name,
      phone: this.state.phone,
    };

    console.log(userData);
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
        <Box
          display="inline"
          //   p={1}
          //   m={1}
          bgcolor="background.paper"
        >
          <IconButton
            aria-label="add"
            title="Add New Customer"
            id="add"
            onClick={this.handleOpen}
            //
            disabled={this.state.disabled}
          >
            <Icon color={this.state.disabled ? "inherit" : "secondary"}>
              add_circle
            </Icon>{" "}
          </IconButton>
        </Box>

        <Box
          display={this.state.open}
          //   p={1}
          //   m={1}
          bgcolor="background.paper"
        >
          <IconButton onClick={this.handleClose} id="button" color="secondary"
          title="Close"
          aria-label="close"
          
          >
            <CloseIcon />
          </IconButton>

          <IconButton
            // variant="outlined"
            type="submit"
            variant="contained"
            id="button"
            color="secondary"
            title="Save"
            aria-label="save"
            // className={classes.button}
            // disabled={loading}
          >
            <CheckIcon />

          </IconButton>
        </Box>
        <Grid>
          <Grid item container direction="row">
            <Grid item xs={12} sm={4}>
              <Box
                display={this.state.open}
                p={1}
                m={1}
                bgcolor="background.paper"
              >
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Full Names"
                  type="text"
                  className={classes.textField}
                  onChange={this.handleOnChange}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                p={1}
                m={1}
                bgcolor="background.paper"
                display={this.state.open}
              >
                <TextField
                  margin="dense"
                  id="email"
                  email="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  value={this.state.email}
                  className={classes.textField}
                  onChange={this.handleOnChange}
                  
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Box
                display={this.state.open}
                p={1}
                m={10}
                bgcolor="background.paper"
              >
                
                <PhoneInput
                  placeholder="Phone Number"
                  country={"ke"}
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  onChange={(phone) => this.setState({ phone })}
                  value={this.state.phone}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

customerForm.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,

  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  // getScream,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(customerForm));
