import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { clearErrors } from "../../../redux/actions/dataActions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import VehicleForm from "./vehicleForm";
import Slide from "@material-ui/core/Slide";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import VehicleTable from "./vehicleTable";

const styles = (theme) => ({
  ...theme.spreadThese,

  dialogContent: {
    padding: 20,
  },
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

class vehicleDialog extends Component {
  state = {
    open: false,
    vehicleCount: this.props.vehicleCount,
    errors: {},
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.clearErrors();
    window.location.reload();
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
    } = this.props;
    const { vehicleCount } = this.state;
    return (
      <div className="container">
        <span>{vehicleCount}</span>
        <IconButton
          variant="round"
          color="primary"
          aria-label="edit"
          title="Add vehicle"
          id="add"
          onClick={this.handleOpen}
        >
          <Icon color="primary">add_circle</Icon>
        </IconButton>

        <Dialog
          className="dialog"
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen
          TransitionComponent={Transition}
        >
          <div className="dialog-body">
            <div className="main-panel" id="main-panel">
              <div className="panel-header panel-header-sm"></div>
              <div className="content">
                <div className="row">
                  <div className="col-sm-12" id="col">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title"> Add Vehicle</h4>
                        {/* <hr /> */}
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <IconButton
                            id="add"
                            tip="Close"
                            onClick={this.handleClose}
                            color="secondary"
                          >
                            <KeyboardReturn />
                          </IconButton>
                          <DialogContent className={classes.dialogContent}>
                            <div className="container">
                              <VehicleTable
                                email={email}
                                name={name}
                                phone={phone}
                                vehicleCount={vehicleCount}
                              />

                              <VehicleForm
                                attendant={attendant}
                                customerId={customerId}
                                createdAt={createdAt}
                                name={name}
                                email={email}
                                phone={phone}
                                vehicleCount={vehicleCount}
                              />
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

vehicleDialog.propTypes = {
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
)(withStyles(styles)(vehicleDialog));
