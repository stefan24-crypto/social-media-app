import React, { useRef, useState } from "react";
import styles from "./Login.module.css";
import { TextField, InputBase } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "../../UI/Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router";
import { collection, addDoc } from "@firebase/firestore";
import { User } from "../../models";

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
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const classes = useStyles();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const usernameRef = useRef<HTMLInputElement>();
  const profilePicRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const usersCollection = collection(db, "users");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (!isLogin) {
      const displayName = usernameRef.current!.value;
      const photoURL = profilePicRef.current!.value;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        if (!auth.currentUser) return;
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: photoURL,
        });
      } catch (error) {
        alert(error);
      }
      const userData: User = {
        id: Math.random().toString(),
        name: displayName,
        profile_pic: photoURL,
        followers: [],
        following: [],
        posts: [],
      };
      await addDoc(usersCollection, userData);
    } else {
      signInWithEmailAndPassword(auth, email, password).catch((error) =>
        alert(error.message)
      );
    }
    navigate("/");
  };

  return (
    <section className={styles.login}>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={submitHandler}>
          <header className={styles.header}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
            inputRef={emailRef}
            required
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
            inputRef={passwordRef}
            required
          />
          {!isLogin && (
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
              inputRef={usernameRef}
              required
            />
          )}
          {!isLogin && (
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
              inputRef={profilePicRef}
              required
            />
          )}
          <div className={styles.btns}>
            <Button type="button" onClick={() => setIsLogin((prev) => !prev)}>
              {isLogin ? "Sign Up" : "Login"}
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Login;
