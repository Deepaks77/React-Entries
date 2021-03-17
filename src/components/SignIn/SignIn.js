import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import AlertMessage from "../AlertMessage/AlertMessage";
import { Alert, AlertTitle } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const signInApi = async (e, p) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login",
        { email: e, password: p },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setErrorLogin("");
      return {
        status: 200,
        data,
      };
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.error.message
          ? error.response.data.error.message
          : error.message;
      setErrorLogin(errorMessage);
      return {
        status: 404,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorLogin("");
    const response = await signInApi(email, password);
    if (response.status === 404) {
      console.log("errorlogin", response.error);
    } else {
      history.push("/");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={onChangeEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            required
            onChange={onChangePassword}
          />
          {loading ? (
            <div style={{ textAlign: "center", paddingTop: "20px" }}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {errorLogin && <AlertMessage message={errorLogin} />}
    </Container>
  );
};

export default SignIn;
