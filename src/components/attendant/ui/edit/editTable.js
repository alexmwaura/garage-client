import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Loader from "../loader";
import Box from "@material-ui/core/Box";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import { Paper } from "@material-ui/core";
import Notification from "../../notification/createNotification"

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

const NotificationTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let id = 0;
  const vehicles = props.vehicles;
  const getLength = (obj) => {
    if (obj == null) return 0;
    const lengthData = Object.keys(obj).length;
    return lengthData;
  };
  let VehicleData = [];
  const vehicleHandler = () => {
    if (vehicles) {
      VehicleData.push(vehicles);
    }
  };
  vehicleHandler();

  const { classes, filterData, hover,mechanics } = props;

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table className={classes.table}>
          <TableHead className="table-header">
            <TableRow>
              <TableCell align="justify" padding="default">
                <Box display="inline" p={1} m={1} bgcolor="background.paper">
                  Model
                </Box>
              </TableCell>
              <TableCell align="justify" padding="default">
                <Box display="inline" p={1} m={1} bgcolor="background.paper">
                  Engine
                </Box>
              </TableCell>
              <TableCell align="justify" padding="default">
                <Box display="inline" p={1} m={1} bgcolor="background.paper">
                  Registration
                </Box>
              </TableCell>
              <TableCell align="center" padding="default">
                <Box display="center" p={1} m={1} bgcolor="background.paper">
                  Actions
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>

          {filterData ? (
            <TableBody padding="default">
              {filterData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(({ vehicleId, model, engine, registration }) => (
                  <TableRow key={vehicleId} hover={hover}>
                    <TableCell>
                      <Box
                        display="center"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                      >
                        {model}
                      </Box>
                    </TableCell>
                    <TableCell align="justify">
                      <Box
                        display="center"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                      >
                        {engine}
                      </Box>
                    </TableCell>
                    <TableCell align="justify">
                      <Box
                        display="center"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                      >
                        {registration}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        display="center"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                      >
                        <Notification
                          vehicleId={vehicleId}
                          mechanics={mechanics}
                        />
                        {vehicleId}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          ) : (
            <TableBody padding="default">
              {
                <Fragment>
                  
                  {getLength(vehicles) > 0 ? (
                    vehicles
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )

                      .map(({ vehicleId, model, engine, registration }) => (
                        <TableRow key={vehicleId} hover={hover}>
                          <TableCell>{model}</TableCell>
                          <TableCell align="justify">{engine}</TableCell>
                          <TableCell align="justify">{registration}</TableCell>
                          <TableCell align="center">{vehicleId}
                          
                          <Notification
                          vehicleId={vehicleId}
                          mechanics={mechanics}
                        />
                          </TableCell>
                        
                        </TableRow>
                        
                      ))
                  ) : (
                    <Fragment>
                        <Fragment>
                           { getLength(vehicles) === 0 ? (<Fragment>Add vehicle</Fragment>):(<Loader/>)}
                        </Fragment>
                    </Fragment>
                  )}

                   



                </Fragment>
              }
            </TableBody>
          )}
        </Table>

        <TablePagination
          rowsPerPageOptions={[3, 4, 5, 10, 15, 20, 100]}
          component="div"
          count={getLength(vehicles)}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

NotificationTable.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
// console.log()

export default connect(mapStateToProps)(withStyles(styles)(NotificationTable));
