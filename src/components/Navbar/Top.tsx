import React from "react";
import classes from "./Top.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from "../../UI/Button";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router";
import { Badge } from "@mui/material";
import useGetNumOfDms from "../../hooks/useGetNumOfDms";
import useGetMessage from "../../hooks/useGetMessage";

const Top: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  const yourMessages = dms.filter((each) =>
    each.people.find((person) => person.name === curUser?.displayName)
  );
  const numOfDms = useGetNumOfDms(yourMessages);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const text = useGetMessage(curUser?.displayName || "");
  return (
    <section className={classes.top}>
      <header
        className={classes.header}
        style={{ width: curUser ? "50%" : "90%" }}
      >
        <div className={classes.message}>
          <h1>{text}</h1>
        </div>
      </header>
      {curUser && (
        <main className={classes.second_container}>
          <div className={classes.icon} onClick={() => navigate("/dm")}>
            <Badge badgeContent={numOfDms} color="warning">
              <FontAwesomeIcon icon={faPaperPlane} />
            </Badge>
          </div>
          <Button className={classes.add_btn} onClick={() => navigate("/add")}>
            <AddCircleOutlinedIcon sx={{ opacity: 0.6 }} />
            <p>Post</p>
          </Button>
        </main>
      )}
    </section>
  );
};

export default Top;
