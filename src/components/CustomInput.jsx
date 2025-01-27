import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

function CustomInput(props) {
  const classes = useStyles();
  return <TextField className={classes.input} {...props} />;
}

const useStyles = makeStyles({
  input: {
    width: "300px",
    "& .MuiInputBase-root": {
      height: "40px",
      margin: "10px 0px",
    },
  },
});

export default CustomInput;
