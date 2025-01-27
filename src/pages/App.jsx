import { makeStyles } from "@mui/styles";
import BannerImg from "../assets/img/banner.png";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.textDiv}>
        <h1 className={classes.titleStyle}>
          <span style={{ display: "block", color: "#1976d2" }}>
            Smarter Tools
          </span>
          <span>for Smarter Education</span>
        </h1>
        <p className={classes.paraStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip.
        </p>
        <div>
          <NavLink to="/courses">
            <Button variant="contained">Learn More...</Button>
          </NavLink>
        </div>
      </div>
      <div className={classes.imgDiv}>
        <img className={classes.imgStyle} src={BannerImg} alt="bg image" />
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 40,
    borderRadius: 20,
    margin: 80,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      margin: "50px 20px",
      padding: 20,
    },
    [theme.breakpoints.down("sm")]: {
      margin: "50px 10px",
      padding: 10,
    },
  },
  textDiv: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  imgDiv: {
    width: "50%",
    marginTop: 0,
    [theme.breakpoints.down("md")]: {
      marginTop: "80px",
      width: "80%",
    },
  },
  imgStyle: {
    width: "100%",
  },
  titleStyle: {
    fontSize: "60px",
    [theme.breakpoints.down("lg")]: {
      fontSize: "32px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "45px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  paraStyle: {
    marginBottom: "30px",
    marginTop: "30px",
  },
}));

export default App;
