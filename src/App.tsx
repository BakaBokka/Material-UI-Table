import "./App.scss";
import Main from "./components/Main/Main";
import { Container } from "@material-ui/core";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header/Header";
import Tables from "./components/Tables/Tables";

const useStyles = makeStyles({
  container: {
    background: "linear-gradient(45deg, #6b7efe 30%, #5393ff 90%)",
    border: 0,
    borderRadius: 3,
    color: "black",
    padding: "0 30px",
    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    minHeight: "100vh",
    width: "100%"
  },
});

function App() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Header/>

      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/table" component={Tables} />
      </Switch>


    </Container>
  );
}

export default App;
