import React, { Fragment, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VehicleDialog from "../../vehicle/vehicleDialog";
import EditDialog from "../edit/editDialog";

import Box from "@material-ui/core/Box";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";

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

const TableData = (props) => {
  const state = {
    open: "none",
    disabled: false,
    hover: true,
    phone: "",
    username: props.username,
    userId: props.userId,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  const { username, hover } = state;
  const { filterData } = props;
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead className="table-header">
          <TableRow>
            <TableCell align="justify"></TableCell>

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

        {filterData ? (
          <TableBody padding="default">
            {filterData
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
                  <TableRow key={customerId} hover={hover}>
                    <TableCell align="center">
                      {username !== attendant ? (
                        <Fragment />
                      ) : (
                        <EditDialog
                          customerId={customerId}
                          attendant={attendant}
                          openDialog={props.openDialog}
                          name={name}
                          createdAt={createdAt}
                          vehicleCount={vehicleCount}
                          email={email}
                          phone={phone}
                        />
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="justify">
                      {phone.replace(/254/, "07")}
                    </TableCell>
                    <TableCell component="th" scope="row" align="justify">
                      {email}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {username !== attendant ? (
                        <Fragment>{vehicleCount}</Fragment>
                      ) : (
                        <VehicleDialog
                          customerId={customerId}
                          attendant={attendant}
                          openDialog={props.openDialog}
                          name={name}
                          createdAt={createdAt}
                          vehicleCount={vehicleCount}
                          email={email}
                          phone={phone}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        ) : (
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
                  <TableRow key={customerId} hover={hover}>
                    <TableCell align="center">
                      {username !== attendant ? (
                        <Fragment />
                      ) : (
                        <EditDialog
                          customerId={customerId}
                          attendant={attendant}
                          openDialog={props.openDialog}
                          name={name}
                          createdAt={createdAt}
                          vehicleCount={vehicleCount}
                          email={email}
                          phone={phone}
                        />
                      )}
                    </TableCell>

                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="justify">
                      {phone.replace(/254/, "07")}
                    </TableCell>
                    <TableCell component="th" scope="row" align="justify">
                      {email}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {username !== attendant ? (
                        <Fragment>{vehicleCount}</Fragment>
                      ) : (
                        <VehicleDialog
                          customerId={customerId}
                          attendant={attendant}
                          openDialog={props.openDialog}
                          name={name}
                          createdAt={createdAt}
                          vehicleCount={vehicleCount}
                          email={email}
                          phone={phone}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        )}
      </Table>
      <TablePagination
        rowsPerPageOptions={[3, 4, 5, 10, 15, 20, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
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
// console.log()

export default connect(mapStateToProps)(withStyles(styles)(TableData));
