import { TextField, Menu, MenuItem } from "@mui/material";
import React, { useRef, useState } from "react";
import classes from "./AddPost.module.css";
import { useValidateImageURL } from "use-validate-image-url";
import useStyles from "../../styles";
import { Categories } from "../../models";
import Button from "../../UI/Button";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { Post } from "../../models";
import { Timestamp } from "firebase/firestore";
import { useAppSelector } from "../../store/hooks";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddPost: React.FC = () => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [capturedFile, setCapturedFile] = useState("");
  const [finalImage, setFinalImage] = useState("");
  const [chosenCategory, setChosenCategory] = useState<string | null>(null);
  const status = useValidateImageURL(capturedFile);
  const styles = useStyles();
  const navigate = useNavigate();
  const titleInputRef = useRef<HTMLInputElement>();
  const tagsInputRef = useRef<HTMLInputElement>();
  const curUser = useAppSelector((state) => state.auth.curUser);
  const postsCollection = collection(db, "posts");

  const submitFileHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "invalid") return alert("Please enter a valid Image URL");
    setFinalImage(capturedFile);
    setCapturedFile("");
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    setChosenCategory(e.currentTarget.textContent);
    setAnchorEl(null);
  };

  if (!curUser) return <></>;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const unique_id = uuid();
    const tags = tagsInputRef.current!.value.split(",");
    if (!chosenCategory || !finalImage) return;
    const data: Post = {
      id: unique_id,
      title: titleInputRef.current!.value,
      image: finalImage,
      date: Timestamp.now(),
      author: curUser.displayName!,
      author_pic: curUser.photoURL!,
      comments: [],
      tags: tags,
      likes: 0,
      category: chosenCategory!,
    };
    await addDoc(postsCollection, data);
    navigate("/");
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
        <form className={classes.form} onSubmit={submitHandler}>
          <div>
            <TextField
              variant="outlined"
              label="Title"
              required
              fullWidth
              InputProps={{
                classes: {
                  notchedOutline: styles.notchedOutline,
                },
                className: styles.input,
              }}
              InputLabelProps={{ className: classes.textField }}
              inputRef={titleInputRef}
            />
          </div>
          <div className={classes.double}>
            <TextField
              variant="outlined"
              label="Tags(comma separated)"
              required
              InputProps={{
                classes: {
                  notchedOutline: styles.notchedOutline,
                },
                className: styles.input,
              }}
              InputLabelProps={{ className: classes.textField }}
              multiline
              rows={3}
              className={classes.input}
              inputRef={tagsInputRef}
            />

            {chosenCategory ? (
              <div className={classes.chose}>
                <p>{chosenCategory}</p>
              </div>
            ) : (
              <>
                <button
                  onClick={handleClick}
                  className={classes.category_btn}
                  type="button"
                >
                  Category
                </button>
                <Menu
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  classes={{ paper: styles.menuPaper }}
                >
                  {Categories.map((each) => (
                    <MenuItem
                      onClick={handleClose}
                      key={each}
                      sx={{ color: "white" }}
                    >
                      {each}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </div>
          <div className={classes.btns}>
            <Button type="button" onClick={() => navigate("/")}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default AddPost;
