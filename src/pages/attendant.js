import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Customers from "../components/attendant/customer/customers";
import {getMechanics,getAllCustomers} from "../redux/actions/dataActions"

const styles = (theme) => ({
  ...theme.spreadThese,
});

class attendant extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      mechanics: [],
    };
  }

  componentDidMount(){
    this.props.getAllCustomers()
    this.props.getMechanics()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.credentials) {
      this.setState({ customers: nextProps.data.customers,mechanics: nextProps.data.mechanics });
    }
    
  }

  render() {
    const { customers,mechanics } = this.state;
    console.log(mechanics);
    return (
      <div>
        <Customers customers={customers} 
        mechanics={mechanics}
        
        />
      </div>
    );
  }
}

attendant.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getAllCustomers: PropTypes.func.isRequired
  
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps,{getMechanics,getAllCustomers})(withStyles(styles)(attendant));
