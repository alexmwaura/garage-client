import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAttendantData } from "../redux/actions/userActions";
import Table from "../components/table";
import Loader from "../components/loader";
import Alert from "@material-ui/lab/Alert";

class userProfile extends Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      customerId: "",
      attendant: "",
      name: "",
      email: "",
      vehicleCount: "",
      createdAt: "",
      errors: {},
      columns: [
        { title: "Name", field: "name" },
        { title: "Email", field: "email" },
        { title: "Phone", field: "phone" },
        { title: "vehicles", field: "vehicleCount", type: "numeric" },
      ],
    };
  }

  componentDidMount() {
    this.props.getAttendantData(this.props.user.username);
    

  }

  render() {
    const customerData = this.props.user.credentials.customers;
    console.log(customerData);
    const loading = this.props.user.loading;
    console.log(loading)
    let customerMarkup = !loading ? (
      <Table customers={customerData} />
    ) : (
      <Loader />
    );
    const { authenticated } = this.props.user;
    console.log(authenticated);
    return (
      <div className="main-panel" id="main-panel">
        <div className="panel-header panel-header-sm"></div>
        <div className="content">
          <div className="row">
            <div className="col-md-8" id="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title"> My Customers</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    {authenticated ? (
                      <Fragment> {customerMarkup}</Fragment>
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

userProfile.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps, { getAttendantData })(userProfile);
