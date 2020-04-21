import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Customers from "../components/attendant/customers";



const styles = (theme) => ({
  ...theme.spreadThese,
});



class attendant extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.credentials) {
      this.setState({ ...nextProps.user.credentials });

      const { customers } = nextProps.user.credentials;
    }
  }

  render() {
    return (
      <div>
        <Customers />
      </div>
    );
  }
}

attendant.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(attendant));
