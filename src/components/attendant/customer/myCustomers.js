import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAttendantData } from "../../../redux/actions/userActions";
import {getCustomer} from "../../../redux/actions/dataActions"
import Table from "../ui/table/table";
import Loader from "../ui/loader";
import Alert from "@material-ui/lab/Alert";
import CustomerForm from "./customerForm";

class myCustomers extends Component {
 state = {
      phone: "",
      customerId: "",
      attendant: "",
      name: "",
      email: "",
      vehicleCount: "",
      createdAt: "",
      errors: {},
      customersData: [],
      
    };
  componentDidMount(){
      this.props.getAttendantData(localStorage.username)
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.user){
      this.setState({customersData: nextProps.user.credentials.customers})
    }
    if(nextProps.data.vehicle){
      this.setState({customersData: nextProps.user.credentials.customers})
    }
 
  }

  render() {
    const { username } = this.props.user.credentials;
    const loading = this.props.user.loading;
    const customers = this.state.customersData

    let customerMarkup = !loading ? (
      <Table customers={customers} />
    ) : (
      <Loader />
    );
    const { authenticated } = this.props.user;
    return (
      <div className="main-panel" id="main-panel">
        <div className="panel-header panel-header-sm"></div>
        <div className="content">
          <div className="row">
            <div className="col-md-12" id="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title"> {username} Customers</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {authenticated ? (
                      <Fragment>
                        {customers ? (
                          <Fragment>
                            {customers.length > 0 ? (
                              <Fragment>{customerMarkup}</Fragment>
                            ) : (
                            <Fragment>
                                <Alert severity="info">
                                {username} ! You have no customers — Please Add
                               
                              </Alert>
                               <div className="container">
                               <CustomerForm
                               newCustomer={this.props.newCustomer}
                             />
                               </div>
                             <br />
                            </Fragment>
                            )}
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Loader />
                          </Fragment>
                        )}

                        

                      </Fragment>



                    ) : (
                      <Fragment>
                        <Alert severity="warning">
                          This is to notify — Please Login!
                        </Alert>
                      </Fragment>
                    )}
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

myCustomers.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getAttendantData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getAttendantData })(myCustomers);
