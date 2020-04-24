import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./util/theme";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/navigation/nav";
import ExtraNav from "./components/navigation/extraNav";
import AuthRoute from "./util/AuthRoute";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import signup from "./pages/signup";
import login from "./pages/login";
import attendant from "./pages/attendant";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { SET_AUTHENTICATED } from "./redux/types";
import myCustomer from "./components/attendant/myCustomers";
import profile from "./pages/profile"

import { getAttendantData,logoutUser } from "./redux/actions/userActions";

import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import AppIcon from "./images/calltronix.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const theme = createMuiTheme(themeObject);

class App extends Component {
  state= {
    username: localStorage.username,
    token: localStorage.FBIdToken,
    role: localStorage.role
  }
  componentDidMount() {
    if (this.state.token && this.state.role === "attendant") {
      const decodedToken = jwtDecode(this.state.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.clear();
        store.dispatch(logoutUser());
        window.location.href = "/";
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] =this.state.token;
        store.dispatch(getAttendantData(this.state.username));
      }
    }
  }

  render() {
    // const classes = useStyles();
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className="wrapper ">
            <Navbar />
            <ExtraNav 
            username={this.state.username}
            
            />
          </div>
          <Router>
            <Switch>
              <Route exact path="/attendant" component={attendant} />
              <Route exact path={`/${this.state.username}/customers`} component={myCustomer} />
              <Route exact path="/profile" component={profile} />
              <AuthRoute exact path="/" component={login} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}
export default App;
