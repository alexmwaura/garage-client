import React, { Component, Fragment } from "react";
import { getAllCustomers } from "../../redux/actions/dataActions";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Table from "../ui/table";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CustomerForm from "../../customer/customerForm";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  ...theme.spreadThese,
});

class search extends Component {
  render() {
    const { classes } = this.props;
    const customerData = this.props.customers;

    return (
      <Fragment>
        <Grid>
          <Grid item container direction="row">
            <Grid item xs={12} sm={4} />
            <Grid item xs={12} sm={4}>
              <CustomerForm />
            </Grid>
            <Grid item xs={12} sm={4}>
              <form className={classes.form} noValidate autoComplete="on">
                <TextField id="standard-basic" label="Search" />
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Table customers={customerData} />
      </Fragment>
    );
  }
}

search.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(search);
