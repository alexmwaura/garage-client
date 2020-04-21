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
import profile from "./components/attendant/myCustomers";

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
  componentDidMount() {
    const token = localStorage.FBIdToken;
    const username = localStorage.username;


    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.clear();
        store.dispatch(logoutUser());
        window.location.href = "/";
      } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = token;
        store.dispatch(getAttendantData(username));
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
            <ExtraNav />
          </div>
          <Router>
            <Switch>
              <Route exact path="/attendant" component={attendant} />
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
