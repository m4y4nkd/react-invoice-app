import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";
import { UserContext } from "../../context/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.error.main,
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [popup, setPopup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const onSubmit = (result, profileObj) => {
    if (result === "SuccessGoogle" || (form.email && form.password)) {
      setUser(profileObj);
      history.push("/onboarding");
    } else {
      setPopup(true);
    }
  };
  const handlePopupClose = (event, reason) => {
    if (reason !== "clickaway") {
      setPopup(false);
    }
  };

  const validateForm = () => {
    return !(form.firstName && form.lastName && form.email && form.password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <br />
        <GoogleLogin onSubmit={onSubmit} />
        <br />
        <Typography component="h2" variant="h6">
          OR <p />
        </Typography>
        <Typography component="h1" variant="h5">
          Fill the form:
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={validateForm()}
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Button
          type="reset"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Clear
        </Button>
        <Grid container>
          <Grid>
            <Link href="/signin" variant="body2">
              Already a user? LOGIN
            </Link>
          </Grid>
        </Grid>
        <Snackbar
          open={popup}
          autoHideDuration={10000}
          onClose={handlePopupClose}
        >
          <Alert onClose={handlePopupClose} severity="error">
            Login Failed!
          </Alert>
        </Snackbar>
      </div>
    </Container>
  );
}
