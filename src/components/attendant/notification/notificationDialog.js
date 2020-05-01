import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { clearErrors } from "../../../redux/actions/dataActions";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Slide from "@material-ui/core/Slide";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import CallToActionIcon from "@material-ui/icons/CallToAction";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Loader from "../ui/loader";
import Box from "@material-ui/core/Box";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import { Paper } from "@material-ui/core";

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
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class notificationDialog extends Component {
  state = {
    open: false,
    vehicleCount: this.props.vehicleCount,
    errors: {},
    mechanics: this.props.mechanics,
    filterData: this.props.mechanicls,
  };

  handleSearch = (event) => {
    event.preventDefault();
    let keyword = event.target.value;
    this.setState({ searchValue: keyword });
    if (this.state.searchValue.length < 0) {
      this.setState({ error: "You have not searched anything" });
      // return this.state.data;
    } else {
      const customData = this.state.mechanics;
      let finalData = customData.filter((data) => {
        if (
          data.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase(), "g") ||
          data.phone.includes(parseInt(event.target.value), "g") ||
          data.email
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
  };
  render() {
    const { classes, vehicleId } = this.props;
    const {mechanics, filterData} = this.state

    const getLength = (obj) => {
      if (obj == null) return 0;
      const lengthData = Object.keys(obj).length;
      return lengthData;
    };
    const hover = true
    return (
      <div className="container">
        <IconButton
          variant="round"
          color="secondary"
          aria-label="edit"
          title="Add vehicle"
          id="add"
          onClick={this.handleOpen}
        >
          <CallToActionIcon />
        </IconButton>

        <Dialog
          className="dialog3"
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen
          TransitionComponent={Transition}
        >
          <div className="dialog-body3">
            <div className="main-panel" id="main-panel">
              <div className="panel-header panel-header-sm"></div>
              <div className="content">
                <div className="row">
                  <div className="col-sm-6" id="col">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title"> Search Mechanic</h4>
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
                            {
                              <div className={classes.profile}>
                                {filterData ? (
                                  <TableBody padding="default">
                                    {filterData
                                      // .slice(
                                      //   page * rowsPerPage,
                                      //   page * rowsPerPage + rowsPerPage
                                      // )
                                      .map(({ username, imageUrl, userId }) => (
                                        <TableRow key={userId} hover={hover}>
                                          <TableCell>
                                            <Box
                                              display="center"
                                              p={1}
                                              m={1}
                                              bgcolor="background.paper"
                                            >
                                              {username}
                                            </Box>
                                          </TableCell>
                                          <TableCell align="justify"></TableCell>
                                          <TableCell align="justify">
                                            <div className="image-wrapper">
                                              <img
                                                src={imageUrl}
                                                className="profile-image"
                                              />
                                            </div>
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                  </TableBody>
                                ) : (
                                  <TableBody padding="default">
                                    {
                                      <Fragment>
                                        {getLength(mechanics) > 0 ? (
                                          mechanics
                                            // .slice(
                                            //   page * rowsPerPage,
                                            //   page * rowsPerPage + rowsPerPage
                                            // )

                                            .map(
                                              ({
                                                userId,
                                                username,
                                                imageUrl,
                                              }) => (
                                                <TableRow
                                                  key={userId}
                                                  hover={hover}
                                                >
                                                  <TableCell>
                                                    {username}
                                                  </TableCell>
                                                  <TableCell align="justify">
                                                    {" "}
                                                    <div className="image-wrapper">
                                                      <img
                                                        src={imageUrl}
                                                        className="profile-image"
                                                      />
                                                    </div>
                                                  </TableCell>
                                                </TableRow>
                                              )
                                            )
                                        ) : (
                                        <Loader/>
                                        )}
                                      </Fragment>
                                    }
                                  </TableBody>
                                )}
                              </div>
                            }
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
)(withStyles(styles)(notificationDialog));
