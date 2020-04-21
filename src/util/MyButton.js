import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

 const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "relative",
    bottom: theme.spacing(2),
    right: theme.spacing(-6),
    border: "none",
    // float: "right"
  },
}));

export default  ({ children, onClick, tip}) => {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid sm={4} item />
        <Grid sm={4} item />
        <Grid sm={4} item>
          <Tooltip
            title="New Customer"
            aria-label="add"
            className={classes.absolute}
            title={tip} placement="top"
          >
            <Fab color="primary" className={classes.fab} id="add"
            onClick={onClick}
            // variant="contained"
            >
              {children}
            </Fab>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
};
