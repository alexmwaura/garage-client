import React, { Component, Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCustomer } from "../../../redux/actions/dataActions";

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

class vehicleTable extends Component {
  state = {
    open: "none",
    disabled: false,
    phone: "",
    vehicleCount: this.props.vehicleCount,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (nextProps.data.vehicle) {
      // this.props.getCustomer(this.props.customerId);
      this.setState({ vehicleCount: this.props.data.customer.vehicleCount });
    }
  }

  render() {
    const {
      classes,
      // customerId,
      // createdAt,
      // attendant,
      email,
      name,
      UI: { loading },
    } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}
        
        
        >
          <TableHead className="table-header">
            <TableRow>
              <TableCell align="justify">Email</TableCell>
              <TableCell align="justify">Name</TableCell>
              <TableCell align="justify">Vehicles</TableCell>
            </TableRow>
          </TableHead>
          <TableBody padding="default">
            <TableRow>
              <TableCell>{email}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{this.state.vehicleCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

vehicleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  vehicleCount: PropTypes.number.isRequired,
  // getCustomer: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
  user: state.user,
});

export default connect(mapStateToProps, { getCustomer })(
  withStyles(styles)(vehicleTable)
);