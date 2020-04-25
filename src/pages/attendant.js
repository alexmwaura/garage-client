import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Customers from "../components/attendant/customer/customers";

const styles = (theme) => ({
  ...theme.spreadThese,
});

class attendant extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.credentials) {
      this.setState({ customers: nextProps.data.customers });
    }
  }

  render() {
    const { customers } = this.state;
    console.log(customers);
    return (
      <div>
        <Customers customers={customers} />
      </div>
    );
  }
}

attendant.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(attendant));
