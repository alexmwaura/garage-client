import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const username = localStorage.username
const role = localStorage.role
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true && role === "attendant" ? <Redirect to={`/${username}/customers`} /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute)