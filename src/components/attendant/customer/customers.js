import React, { Component,Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllCustomers } from "../../../redux/actions/dataActions";
import Table from "../ui/table/table";
import Loader from "../ui/loader";
import Alert from '@material-ui/lab/Alert';


export class customers extends Component {
 
  componentDidMount() {
    this.props.getAllCustomers();
  }

  render() {
    const customerData = this.props.customers;
    const loading = this.props.data.loading;
    let customerMarkup = !loading ? (
      <Table customers={customerData} />
    ) : (
      <Loader />
    );
    const {authenticated}= this.props.user  

    return (
      <div className="main-panel" id="main-panel">
        <div className="panel-header panel-header-sm"></div>
        <div className="content">
          <div className="row">
            <div className="col-sm-12" id="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title"> All Customers</h4>
                  {/* <hr /> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    
                    
                   {authenticated? (
                   <div className="container">
                     <Fragment>
                    
                      {customerMarkup}
                      
                      </Fragment>
                   </div>
                      
                      ):(
                     <Fragment><Alert severity="warning" >This is to notify — Please Login!</Alert></Fragment>
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

customers.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getAllCustomers: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, { getAllCustomers })(customers);
