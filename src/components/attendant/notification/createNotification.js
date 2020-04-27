import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getMechanics } from "../../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadThese,
  root: {
    width: "100%",
    overflowY: "auto",
    overflowX: "auto",
  },
  table: {
    // marginLeft: theme.spacing(2),
    flex: 0,
  },
});

class createNotification extends Component {


  state = {
    mechanics: this.props.mechanics
  }
  componentDidMount(){
    this.props.getMechanics()
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.data.mechanics){
  //     this.setState({mechanics: nextProps.data.mechanics})
  //   }
  // }

  render() {
    console.log(this.props.mechanics);
    return <div></div>;
  }
}

createNotification.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  // getMechanics: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getMechanics,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(createNotification));
