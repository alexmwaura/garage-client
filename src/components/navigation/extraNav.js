import React, { Component,Fragment } from "react";
import AppIcon from "../../images/calltronix.jpg";
import {connect} from "react-redux"
import PropTypes from "prop-types";
import {logoutUser} from "../../redux/actions/userActions"
import Button from '@material-ui/core/Button';



class extraNav extends Component {
  handleLogout = () =>{
    this.props.logoutUser()
  }
  
    render() {
      const {username} = this.props
      const {authenticated} = this.props.user
        return (
          <nav className="navbar navbar-expand-lg navbar-transparent  bg-primary  navbar-absolute">
            {authenticated ? (
              <Fragment>
                <div className="container-fluid">
              <div className="navbar-wrapper">
                <div className="navbar-toggle">
                  <button type="button" className="navbar-toggler">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                </div>
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-bar navbar-kebab"></span>
                <span className="navbar-toggler-bar navbar-kebab"></span>
                <span className="navbar-toggler-bar navbar-kebab"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end" id="navigation">
              
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="now-ui-icons media-2_sound-wave"></i>
                      <p>
                        <span className="d-lg-none d-md-block">Analysis</span>
                      </p>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="now-ui-icons location_world"></i>
                      <p>
                        <span className="d-lg-none d-md-block">User Actions</span>
                      </p>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" href={`${username}/customers`}>My Customers</a>
                      <a className="dropdown-item" href="/" onClick={this.handleLogout} id="logout">Logout</a>
                      {/* <a className="dropdown-item" href="/profile">Something else here</a> */}
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/profile">
                      <i className="now-ui-icons users_single-02"></i>
                      <p>
                        <span className="d-lg-none d-md-block">Account</span>
                      </p>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
              </Fragment>
            ):(
              <Fragment/>
            )}
          </nav>
        )
    }
}

extraNav.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapActionsToProps = {logoutUser}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps,mapActionsToProps)(extraNav)

