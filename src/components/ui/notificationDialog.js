import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import EditIcon from '@material-ui/icons/Edit';
import Slide from "@material-ui/core/Slide";
import NotificationTable from "./notificationTable";
import { getCustomer } from "../../redux/actions/dataActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchComponent from "./EnhancedToolbar";
import VehicleDialog from "./vehicleDialog";

import TableContainer from "@material-ui/core/TableContainer";

const styles = (theme) => ({
  ...theme.spreadThese,
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class notificationDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    searchValue: "",
    newPath: "",
    error: "",
    hover: true,
    vehicleCount: this.props.vehicleCount,
    customerId: this.props.customerId,
    vehicles: {},
    filterData: this.props.data.customer.vehicles,
  };

  handleSearch = (event) => {
    event.preventDefault();
    let keyword = event.target.value;
    this.setState({ searchValue: keyword });
    if (this.state.searchValue.length < 0) {
      this.setState({ error: "You have not searched anything" });
      // return this.state.data;
    } else {
      const customData = this.state.vehicles;
      let finalData = customData.filter((data) => {
        if (
          data.model
            .toLowerCase()
            .includes(event.target.value.toLowerCase(), "g") ||
          data.registration.toLowerCase().includes(event.target.value, "g") ||
          data.engine
            .toLowerCase()
            .includes(event.target.value.toLowerCase(), "g")
        ) {
          return data;
        }
      });

      this.setState({
        filterData: finalData,
      });
    }
  };

  componentWillReceiveProps(nextProps) {
    // console.lo()
    if (nextProps.data.customer.vehicles) {
      this.setState({ vehicles: nextProps.data.customer.vehicles });
    }
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.vehicle) {
      this.setState({ vehicle: nextProps.vehicle.vehicleCount });
    }
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.props.getCustomer(this.state.customerId);
      this.handleOpen();
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
  };
  render() {
    const {
      classes,
      customerId,
      createdAt,
      attendant,
      email,
      name,
      vehicleCount,
    } = this.props;
    // console.log(this.props.customerId)

    let vehicleMarkUp = (id) => {
      this.props.getCustomer(id);
      console.log(this.props);
    };

    let handleEvents = (id) => {
      vehicleMarkUp(id);
      this.handleOpen();
    };

    const getLength = (obj) => {
      if (obj == null) return 0;
      const lengthData = Object.keys(obj).length;
      return lengthData;
    };

    const { vehicles, filterData, hover, error } = this.state;

    // vehicleMarkUp(customerId)
    return (
      <div className="container">
        <span>{vehicleCount}</span>
        <IconButton
          // variant="round"
          id="add"
          // color="secondary"
          aria-label="edit"
          title={`${vehicleCount} Edit`}
          // id="add"
          onClick={() => handleEvents(customerId)}
        >
          <EditIcon color="secondary"></EditIcon>
        </IconButton>

        <Dialog
          className="dialog2"
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen
          TransitionComponent={Transition}
        >
          <div className="dialog-body2">
            <div className="main-panel" id="main-panel">
              <div className="panel-header panel-header-sm"></div>
              <div className="content">
                <div className="row">
                  <div className="col-sm-12" id="col">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title"> Send Notification</h4>
                        {/* <hr /> */}
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <Button
                            id="add"
                            tip="Close"
                            onClick={this.handleClose}
                          >
                            <CloseIcon />
                          </Button>
                          <DialogContent className={classes.dialogContent}>
                            <div className="container">
                              <SearchComponent
                                //  newCustomer={this.props.newCustomer}
                                handleSearch={this.handleSearch}
                                error={error}
                                value={this.searchValue}
                              />

                              <Paper className={classes.root}>
                                <Table className={classes.table}>
                                  <TableHead className="table-header">
                                    <TableRow>
                                      <TableCell align="justify"></TableCell>
                                      <TableCell align="justify">
                                        Email
                                      </TableCell>
                                      <TableCell align="justify">
                                        Name
                                      </TableCell>
                                      <TableCell align="justify">
                                        Vehicles
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody padding="default">
                                    <TableRow>
                                      <TableCell align="justify">
                                        <VehicleDialog
                                          customerId={customerId}
                                          attendant={attendant}
                                          openDialog={this.props.openDialog}
                                          name={name}
                                          createdAt={createdAt}
                                          vehicleCount={vehicleCount}
                                          email={email}
                                        />
                                      </TableCell>
                                      <TableCell>{email}</TableCell>
                                      <TableCell>{name}</TableCell>
                                      <TableCell>
                                        {this.state.vehicleCount}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Paper>

                              <TableContainer>
                                <NotificationTable
                                  vehicles={vehicles}
                                  hover={hover}
                                  filterData={filterData}
                                  handleSearch={this.handleSearch}
                                  value={this.searchValue}
                                />
                              </TableContainer>
                            </div>
                          </DialogContent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

notificationDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getCustomer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
  getCustomer,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(notificationDialog));
