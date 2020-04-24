import React, { Component, Fragment, useState } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CustomerForm from "./customerForm";
import TableContainer from "@material-ui/core/TableContainer";
import CustomTable from "./tablePagination";
import SearchComponent from "./EnhancedToolbar";

const styles = (theme) => ({
  ...theme.spreadThese,
  root: {
    // width: "100%",
    marginTop: theme.spacing(3),
    overflowY: "auto",
    overflowX: "auto",
  },
  table: {
    // marginLeft: theme.spacing(2),
    flex: 0,
  },
});

class TableData extends Component {
  state = {
    open: "none",
    disabled: false,
    order: "g",
    orderBy: "email",
    selected: [],
    searchValue: "",
    data: this.props.customers,
    filterData: this.props.data,
    error: "",
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  };

  onChange(event) {
    this.setState({
      searchValue: event.target.value,
    });
    console.log(this.state.searchValue);
  }


  handleSearch = (event) => {
    event.preventDefault();
    let keyword = event.target.value;
    this.setState({ searchValue: keyword });
    if (this.state.searchValue.length < 0) {
      this.setState({ error: "You have not searched anything" });
      // return this.state.data;
    } else {
      const customData = this.state.data;
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

  render() {
    const { classes } = this.props;
    let id = 0;
    const { username, userId } = this.props.user.credentials;
    const { filterData, order, orderBy, selected, data, error } = this.state;
    // console.log(error + "error");
    return (
      <div className="container">
        <SearchComponent
          //  newCustomer={this.props.newCustomer}
          handleSearch={this.handleSearch}
          error={error}
          value={this.searchValue}
        />

        <Paper className={classes.root}>
          <CustomTable
            filterData={filterData}
            customers={data}
            handleSearch={this.handleSearch}
            // handleClick={this.handleClick(id,column)}
            value={this.searchValue}
          />
        </Paper>
      </div>
    );
  }
}

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
