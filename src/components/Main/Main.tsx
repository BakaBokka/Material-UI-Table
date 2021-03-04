import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: "20px",
    marginTop: "20px",
  },
});

function Main() {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <Typography variant="h3" className={classes.title}>Hello!</Typography>
      <Button variant="contained" color="primary" to="/table" component={Link}>
        Show table
      </Button>
    </Box>
  );
}

export default Main;
