import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { clearErrors } from "../../../redux/actions/dataActions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { TextField } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";

const styles = (theme) => ({
  ...theme.spreadThese,
});
export class notificationForm extends Component {
  render() {
    const { mechanics, classes } = this.props;
    return (
    
       <Fragment/>
    );
  }
}
notificationForm.propTypes = {
  classes: PropTypes.object.isRequired,
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
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(notificationForm));
