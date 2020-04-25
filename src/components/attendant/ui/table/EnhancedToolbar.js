import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import CustomerForm from '../../customer/customerForm'

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
  actions: {
    marginLeft: "auto",
  },
  title: {
    flex: "0 0 auto",
  },
});

const EnhancedTableToolbar = (props) => {
  const { numSelected, classes, value, handleSearch,error } = props;


  

  return (
    <Grid>
      <Grid item item container direction="row">
        <Grid item xs={12} sm={9} >
        <CustomerForm
         
         
         />
        </Grid> 

        <Grid item xs={12} sm={3}>
          <Box p={1} m={1} bgcolor="background.paper">
            <form noValidate
            onSubmit={e => { e.preventDefault(); } }
            className={classes.form}
            >

            <TextField
              variant="outlined"
              // autoFocus
              margin="dense"
              // fullWidth
              id="name"
              name="search"
              label="Search"
              type="text"
              helperText={error}
              error={error  ? true : false}
              color={classes.secondaryTwo}
              className={classes.textField}
              onChange={handleSearch}
              value={value}
            />
            
            </form>
            
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps)(
  withStyles(styles)(EnhancedTableToolbar)
);
