import React, { Component } from 'react';
import { render } from 'react-dom';
// import Hello from './Hello';
// import './style.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, createStyles } from '@material-ui/styles';
import keycode from 'keycode';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import TablePagination from "@material-ui/core/TablePagination";
import TableContainer from "@material-ui/core/TableContainer";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TextField from '@material-ui/core/TextField';
import TableSortLabel from '@material-ui/core/TableSortLabel'

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
    marginLeft: 'auto'
  },
  title: {
    flex: '0 0 auto',
  },
});

const EnhancedTableToolbar = props => {
const { numSelected, classes, value, handleSearch} = props;

return(
    <Toolbar
      className={classNames(classes.root, {
      })}
    >
      <div className={classes.title}>
        {numSelected > 0
          ? <Typography type="subheading">
              {numSelected} selected
            </Typography>
          : <Typography type="title">Nutrition</Typography>}
      </div>
      <div className={classes.actions}>
        
              <TextField  placeholder="Search" onChange={handleSearch} value={value}/>
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            
      </div>
    </Toolbar>
)

}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };

export default withStyles(styles)(EnhancedTableToolbar)  