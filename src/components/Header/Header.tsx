import React from "react";
import { NavLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    backgroundColor: "transparent",
    border: 0,
    boxShadow: "none",
    width: "320px",
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
    listStyle: "none",
    padding: "30px",
    margin: 0,
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",

    "&:hover": {
      color: "white",
    }
  },

  active: {
    color: "white",
  },
});

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={classes.link} activeClassName={classes.active} exact>
              MAIN
            </NavLink>
          </li>
          <li>
            <NavLink to="/table" className={classes.link} activeClassName={classes.active}>
              TABLE
            </NavLink>
          </li>
        </ul>
      </nav>
    </AppBar>
  );
}

export default Header;
