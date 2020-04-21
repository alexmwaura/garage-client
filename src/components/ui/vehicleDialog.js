import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import { connect } from "react-redux";
import { clearErrors } from "../../redux/actions/dataActions";
import Button from "@material-ui/core/Button";
import { IconButton, Card, Tab } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import VehicleForm from "./vehicleForm";
import Slide from "@material-ui/core/Slide";
import VehicleTable from "./vehicleTable";

const styles = (theme) => ({
  ...theme.spreadThese,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing(3),
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing(3),
    },
  },
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowY: "auto",
    overflowX: "auto",
  },
  table: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class vehicleDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
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
    if (nextProps.vehicle) {
      this.setState({ vehicle: nextProps.vehicle.vehicleCount });
    }
  }

  state = {
    open: false,
    oldPath: "",
    newPath: "",
    vehicleCount: this.props.vehicleCount,
  };
  componentDidMount() {
    if (this.props.openDialog) {
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
      UI: { loading },
    } = this.props;

    return (
      <div className="container">
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
                          <Button
                            id="add"
                            tip="Close"
                            onClick={this.handleClose}
                          >
                            <CloseIcon />
                          </Button>
                          <DialogContent className={classes.dialogContent}>
                            <div className="container">
                              <VehicleTable
                                attendant={attendant}
                                customerId={customerId}
                                createdAt={createdAt}
                                name={name}
                                vehicleCount={vehicleCount}
                                email={email}
                              />

                              <VehicleForm
                                attendant={attendant}
                                customerId={customerId}
                                createdAt={createdAt}
                                name={name}
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
