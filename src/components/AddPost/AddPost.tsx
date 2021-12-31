import { TextField } from "@mui/material";
import React, { useState } from "react";
import classes from "./AddPost.module.css";
import { useValidateImageURL } from "use-validate-image-url";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  notchedOutline: {
    borderWidth: " 1px",
    borderColor: "#f77737 !important",
  },
  input: {
    color: "white",
  },
}));

const AddPost: React.FC = () => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [capturedFile, setCapturedFile] = useState("");
  const [finalImage, setFinalImage] = useState("");
  const status = useValidateImageURL(capturedFile);
  const styles = useStyles();

  const submitFileHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "invalid") return alert("Please enter a valid Image URL");
    setFinalImage(capturedFile);
    setCapturedFile("");
  };

  return (
    <section className={classes.addPost}>
      <header
        className={classes.header}
        style={{
          backgroundImage: finalImage
            ? `url(${finalImage})`
            : "linear-gradient(to top,rgba(0, 0, 0, 0.397),rgba(0, 0, 0, 0.397))",
          backgroundColor: "rgba(0, 0, 0, 0.397)",
        }}
      >
        {finalImage ? (
          <div className={classes.back}>
            <button
              className={classes.btn}
              onClick={() => {
                setFinalImage("");
                setShowFileInput(false);
              }}
              type="button"
            >
              back
            </button>
          </div>
        ) : (
          <div className={classes.input_image}>
            <button
              className={classes.btn}
              onClick={() => setShowFileInput((prev) => !prev)}
              type="button"
            >
              {showFileInput ? "Close" : "Image URL"}
            </button>
            <form onSubmit={submitFileHandler}>
              {showFileInput && (
                <TextField
                  variant="outlined"
                  label="Image URL"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCapturedFile(e.target.value);
                  }}
                  required
                  fullWidth
                  InputProps={{
                    classes: {
                      notchedOutline: styles.notchedOutline,
                    },
                    className: styles.input,
                  }}
                  InputLabelProps={{ className: classes.textField }}
                />
              )}
            </form>
          </div>
        )}
      </header>
      <main className={classes.main}>
        <form>
          <div></div>
        </form>
      </main>
    </section>
  );
};

export default AddPost;
