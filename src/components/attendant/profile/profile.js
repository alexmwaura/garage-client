import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { IconButton, Card, Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// Icons
import DataUsageIcon from "@material-ui/icons/DataUsage";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Loader from "../ui/loader";
import { uploadImage } from "../../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadThese,
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
export class profile extends Component {
  constructor() {
    super();
    this.state = {
      imageUrl: "",
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    console.log(formData);
    this.props.uploadImage(formData, this.props.user.credentials.username);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  render() {
    const {
      credentials: { imageUrl, username, email, role, createdAt, customers },
      loading,
      authenticated,
    } = this.props.user;
    const getLength = (obj) => {
      if (obj == null) return 0;
      const lengthData = Object.keys(obj).length;
      return lengthData;
    };
    const { classes } = this.props;
    console.log(this.state.imageUrl);

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="image-wrapper">
              <img src={imageUrl} alt="profile" className="profile-image" />
              <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <IconButton
                tip="Edit profile picture"
                id="add"
                onClick={this.handleEditPicture}
              >
                <CloudUploadIcon color="primary" />
              </IconButton>
            </div>
            <hr />
            <div className="profile-details">
              <h5>
                <a href={`/${username}/customers`}>@{username}</a>
              </h5>
              <hr />
              {role && <Typography variant="body2">{role}</Typography>}
              <hr />
              {getLength(customers) && (
                <Fragment>
                  <IconButton title="Total Customers" id="add">
                    <DataUsageIcon color="secondary" />
                  </IconButton>
                  <span>{getLength(customers)}</span>

                  <hr />
                </Fragment>
              )}
              {email && (
                <Fragment>
                  <LinkIcon color="secondary" /> {email}
                  <hr />
                </Fragment>
              )}
              <CalendarToday color="primary" />{" "}
              <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
            </div>
            {/* <MyButton tip="Logout" onClick={this.handleLogout}>
              <KeyboardReturn color="primary" />
            </MyButton> */}
            {/* <EditDetails /> */}
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            No profile found, please login again
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <Fragment>
        <Loader />
      </Fragment>
    );

    return (
      <div className="main-panel" id="main-panel">
        <div className="panel-header panel-header-sm"></div>
        <div className="content">
          <div className="row">
            <div className="col-sm-8" id="col">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">{username} Profile </h4>
                  {/* <hr /> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive">{profileMarkup}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

profile.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

const mapActionsToProps = { uploadImage };
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(profile));
