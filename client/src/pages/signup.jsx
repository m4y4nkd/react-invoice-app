import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GoogleLogin from "../components/GoogleLogin";

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

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <br />
        <GoogleLogin />
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
          autoComplete="first-name"
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
          autoComplete="last-name"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
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
      </div>
    </Container>
  );
}
