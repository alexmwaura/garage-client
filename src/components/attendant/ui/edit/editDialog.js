import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { clearErrors,getMechanics } from "../../../../redux/actions/dataActions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import EditTable from "./editTable";
import { getCustomer } from "../../../../redux/actions/dataActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchComponent from "../table/EnhancedToolbar";
import VehicleDialog from "../../vehicle/vehicleDialog";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import ArchiveIcon from "@material-ui/icons/Archive";
import UpdateIcon from "@material-ui/icons/Update";
import TableContainer from "@material-ui/core/TableContainer";
import { Grid } from "@material-ui/core";

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

class editDialog extends Component {
  state = {
    open: false,
    disabled: false,
    edit: "none",
    oldPath: "",
    searchValue: "",
    newPath: "",
    errors: {},
    hover: true,
    vehicleCount: this.props.vehicleCount,
    customerId: this.props.customerId,
    vehicles: {},
    mechanics: [],
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
      this.props.getCustomer(this.state.customerId);
    }
    if (nextProps.data.mechanics){
      this.setState({mechanics: nextProps.data.mechanics})
    }
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.props.getCustomer(this.state.customerId);
      this.props.getMechanics()
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

  handleEdit = () => {
    this.setState({ edit: "inline", disabled: true });
  };
  handleCloseEdit = () => {
    this.setState({ edit: "none", disabled: false });
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
      phone,
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

    const { vehicles, filterData, hover, errors,mechanics } = this.state;
    console.log(mechanics)  
    // vehicleMarkUp(customerId)
    return (
      <div className="container">
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
                        <h4 className="card-title"> {attendant} Actions</h4>
                        {/* <hr /> */}
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <Grid>
                            <Grid container direction="row">
                              <Grid xs={12} sm={2}>
                                <IconButton
                                  id="add"
                                  tip="Close"
                                  color="secondary"
                                  onClick={this.handleClose}
                                >
                                  <KeyboardReturn />
                                </IconButton>
                              </Grid>

                              <Grid xs={12} sm={8}></Grid>
                              <Grid sx={12} sm={2}>
                                <IconButton
                                  id="add"
                                  tip="Close"
                                  color="primary"
                                  component={Link}
                                  onClick={() => window.location.reload()}
                                >
                                  <ArchiveIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                          <DialogContent className={classes.dialogContent}>
                            <div className="container">
                              <SearchComponent
                                //  newCustomer={this.props.newCustomer}
                                handleSearch={this.handleSearch}
                                value={this.searchValue}
                              />

                              <Paper className={classes.root}>
                                <Table className={classes.table}>
                                  <TableHead className="card-header">
                                    <TableRow className="card-title">
                                      <TableCell align="justify"></TableCell>
                                      <TableCell align="justify" id="head">
                                        Email
                                      </TableCell>
                                      <TableCell align="justify" id="head">
                                        Name
                                      </TableCell>

                                      <TableCell align="justify">
                                        Phone
                                      </TableCell>

                                      <TableCell align="justify">
                                        Vehicles
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody padding="default">
                                    <TableRow>
                                      <TableCell align="justify">
                                        <IconButton
                                          color="secondary"
                                          disabled={this.state.disabled}
                                          onClick={this.handleEdit}
                                        >
                                          <EditIcon />
                                        </IconButton>
                                        <Box display={this.state.edit}>
                                          <IconButton
                                            color="secondary"
                                            onClick={this.handleCloseEdit}
                                          >
                                            <CloseIcon />
                                          </IconButton>
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        {email}

                                        <Box
                                          display={this.state.edit}
                                          p={1}
                                          m={1}
                                          bgcolor="background.paper"
                                        >
                                          <TextField
                                            autoFocus
                                            // margin="dense"
                                            id="name"
                                            name="name"
                                            label="Full Names"
                                            type="text"
                                            className={classes.textField}
                                            onChange={this.handleOnChange}
                                            helperText={errors.name}
                                            error={errors.name ? true : false}
                                          />
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        {name}
                                        <Box
                                          display={this.state.edit}
                                          p={1}
                                          m={1}
                                          bgcolor="background.paper"
                                        >
                                          <TextField
                                            autoFocus
                                            // margin="dense"
                                            id="name"
                                            name="name"
                                            label="Full Names"
                                            type="text"
                                            className={classes.textField}
                                            onChange={this.handleOnChange}
                                            helperText={errors.name}
                                            error={errors.name ? true : false}
                                          />
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        {phone}
                                        <Box
                                          display={this.state.edit}
                                          p={1}
                                          m={1}
                                          bgcolor="background.paper"
                                        >
                                          <TextField
                                            autoFocus
                                            // margin="dense"
                                            id="name"
                                            name="name"
                                            label="Full Names"
                                            type="text"
                                            className={classes.textField}
                                            onChange={this.handleOnChange}
                                            helperText={errors.name}
                                            error={errors.name ? true : false}
                                          />
                                        </Box>
                                      </TableCell>
                                      <TableCell>
                                        <VehicleDialog
                                          customerId={customerId}
                                          attendant={attendant}
                                          openDialog={this.props.openDialog}
                                          name={name}
                                          createdAt={createdAt}
                                          vehicleCount={vehicleCount}
                                          email={email}
                                          mechanics={mechanics}
                                        />
                                        <Box display={this.state.edit}>
                                          <IconButton
                                            color="secondary"
                                            onClick={this.handleCloseEdit}
                                          >
                                            <UpdateIcon />
                                          </IconButton>
                                        </Box>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Paper>

                              <TableContainer>
                                <EditTable
                                  vehicles={vehicles}
                                  hover={hover}
                                  filterData={filterData}
                                  handleSearch={this.handleSearch}
                                  value={this.searchValue}
                                  mechanics={mechanics}
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

editDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getCustomer: PropTypes.func.isRequired,
  getMechanics: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  clearErrors,
  getCustomer,
  getMechanics,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(editDialog));
