import { TextField } from "@mui/material";
import React, { useRef } from "react";
import classes from "./AddBio.module.css";
import useStyles from "../../styles";
import Button from "../../UI/Button";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

interface OverlayProps {
  onClick?: () => void;
}
const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick}></div>;
};

interface AddBioProps {
  closeModal: () => void;
  id: string;
}

const AddBio: React.FC<AddBioProps> = ({ closeModal, id }) => {
  const bioRef = useRef<HTMLInputElement>();
  const styles = useStyles();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const userDoc = doc(db, "users", id);
    const newFields = {
      bio: bioRef.current!.value,
    };
    await updateDoc(userDoc, newFields);
    closeModal();
  };

  return (
    <>
      <Overlay onClick={closeModal} />
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="bio">Bio</label>
        <TextField
          id="bio"
          multiline
          rows={5}
          variant="outlined"
          fullWidth
          InputProps={{
            classes: {
              notchedOutline: styles.notchedOutline,
            },
            className: styles.input,
          }}
          InputLabelProps={{ className: classes.textField }}
          inputRef={bioRef}
        />
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default AddBio;
