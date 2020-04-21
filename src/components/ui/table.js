import React, { Component, Fragment, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MyButton from "../../util/MyButton";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VehicleDialog from "./vehicleDialog";
import Box from "@material-ui/core/Box";
import CustomerForm from "./customerForm";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";

const styles = (theme) => ({
  ...theme.spreadThese,
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowY: "auto",
    overflowX: "auto",
  },
  table: {
    // marginLeft: theme.spacing(2),
    flex: 0,
  },
});

const columns = [
  { id: "name", label: "Name" },
  { id: "phone", label: "Phone" },
  {
    id: "Email",
    label: "Email",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "vehicles",
    label: "Vehicles",
    format: (value) => value.toLocaleString(),
  },
];

const TableData = (props) => {
  const state = {
    open: "none",
    disabled: false,
    phone: "",
  };

  const componentWillReceiveProps = (nextProps) => {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { classes } = props;
  let id = 0;
  const data = props.customers;
  const { username, userId } = props.user.credentials;

  return (
    <div className="container" >
  

      <Paper className={classes.root}>
        <TableContainer>
          <Table className="common-table">
            <TableHead className="table-header">
              <TableRow>
                <TableCell align="justify"></TableCell>

                <TableCell align="justify" padding="default">
                  {" "}
                  <Box
                    component="div"
                    display="inline"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                  ></Box>
                </TableCell>
                <TableCell align="justify" padding="default">
                  <Box
                    component="div"
                    display="inline"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                  >
                    Name
                  </Box>
                </TableCell>
                <TableCell align="justify" padding="default">
                  <Box
                    component="div"
                    display="inline"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                  >
                    Phone
                  </Box>
                </TableCell>
                <TableCell align="justify" padding="default">
                  <Box
                    component="div"
                    display="inline"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                  >
                    Email
                  </Box>
                </TableCell>
                <TableCell align="center" padding="default">
                  <Box
                    component="div"
                    display="center"
                    p={1}
                    m={1}
                    bgcolor="background.paper"
                  >
                    vehicles
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody padding="default">
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  ({
                    customerId,
                    name,
                    phone,
                    email,
                    vehicleCount,
                    attendant,
                    createdAt,
                  }) => (
                    <TableRow key={id}>
                      <TableCell align="center">
                        {username !== attendant ? (
                          <Fragment />
                        ) : (
                          <VehicleDialog
                            customerId={customerId}
                            attendant={attendant}
                            openDialog={props.openDialog}
                            name={name}
                            createdAt={createdAt}
                            vehicleCount={vehicleCount}
                            email={email}
                          />
                        )}
                      </TableCell>

                      <TableCell align="center" component="th" scope="row">
                        {props.customers.length > id ? (id += 1) : id}
                      </TableCell>

                      <TableCell component="th" scope="row">
                        {name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="justify">
                        {phone}
                      </TableCell>
                      <TableCell component="th" scope="row" align="justify">
                        {email}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {vehicleCount}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <br />
    </div>
  );
};

TableData.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(TableData));

