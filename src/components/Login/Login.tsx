import React from "react";
import styles from "./Login.module.css";
import { TextField, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "../../UI/Button";

const useStyles = makeStyles((theme: any) => ({
  notchedOutline: {
    borderWidth: " 1px",
    borderColor: "#f77737 !important",
  },
  input: {
    color: "white",
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  return (
    <section className={styles.login}>
      <main className={styles.main}>
        <form className={styles.form}>
          <header className={styles.header}>
            <h1>Sign Up</h1>
          </header>
          <TextField
            variant="outlined"
            label="Email"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              className: classes.input,
            }}
            InputLabelProps={{ className: styles.textField }}
          />
          <TextField
            variant="outlined"
            label="Password"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              className: classes.input,
            }}
            InputLabelProps={{ className: styles.textField }}
            type="password"
            className={styles.input}
          />
          <TextField
            variant="outlined"
            label="Username"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              className: classes.input,
            }}
            InputLabelProps={{ className: styles.textField }}
          />
          <TextField
            variant="outlined"
            label="Profile Pic"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
              className: classes.input,
            }}
            InputLabelProps={{ className: styles.textField }}
          />
          <div className={styles.btns}>
            <Button type="button">Login</Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Login;
