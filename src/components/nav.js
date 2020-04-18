import React, { Component,Fragment } from "react";
import AppIcon from "../images/calltronix.jpg";
import {connect} from "react-redux"
import PropTypes from "prop-types";


class nav extends Component {
  render() {
    const {authenticated} = this.props.user
    return (
      <div className="sidebar" data-color="green">
        <div className="logo">
          <a className="simple-text logo-mini">CT</a>
          <a className="simple-text logo-normal">Call-Tronix</a>
        </div>
        <div className="sidebar-wrapper" id="sidebar-wrapper">
          <ul className="nav">
              {authenticated ? (
                <Fragment>
                   <li >
                 <a href="/attendant">
                   <i className="now-ui-icons design_app"></i>
                   <p>customers</p>
                 </a>
               </li>
                </Fragment>
   
              ):(
                <Fragment>
                    <li> 
                <a href="/login">
                  <i className="now-ui-icons education_atom"></i>
                  <p>Login</p>
                </a>
              </li>
              <li>
                <a href="signup">
                  <i className="now-ui-icons location_map-big"></i>
                  <p>Signup</p>
                </a>
              </li>
                </Fragment>
              )
              }
           
          </ul>
        </div>
      </div>
    );
  }
}

nav.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(nav);
