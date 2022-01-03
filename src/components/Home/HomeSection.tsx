import { CircularProgress } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../store/hooks";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import PostCard from "../Post/PostCard";
import classes from "./HomeSection.module.css";

const HomeSection: React.FC = () => {
  const users = useAppSelector((state) => state.data.users);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const posts = useAppSelector((state) => state.data.posts);

  if (!posts || posts.length === 0) return <h1>No Posts</h1>;

  const splitArrayIntoChunksOfLen = (arr: any[], len: number) => {
    const chunks = [],
      n = arr.length;
    let firstDivider = Math.ceil(arr.length / len);
    let i = 0;
    while (i < n) {
      chunks.push(arr.slice(i, (i += firstDivider)));
    }
    return chunks;
  };

  let [firstArr, secondArr, thirdArr, fourthArr] = splitArrayIntoChunksOfLen(
    posts,
    4
  );

  if (!secondArr && !thirdArr && !fourthArr) {
    secondArr = thirdArr = fourthArr = [];
  } else if (!secondArr) {
    secondArr = [];
  } else if (!thirdArr) {
    thirdArr = [];
  } else if (!fourthArr) {
    fourthArr = [];
  }

  if (users.length === 0 || !users)
    return (
      <div className="loading">
        <CircularProgress sx={{ color: "white" }} />
      </div>
    );

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircularProgress sx={{ color: "white" }} />
        </div>
      ) : (
        <section className={classes.home}>
          <header>
            <h1 className={classes.h1}>People</h1>
            <div className={classes.people}>
              {users.map((each) => {
                if (each.name === curUser?.displayName) return;
                return (
                  <ProfileCirlcle
                    src={each.profile_pic}
                    bgColor="#292929"
                    key={each.id}
                    id={each.id}
                    width="75px"
                    height="75px"
                    paddingOnGradient="1.5px"
                    paddingOnImage="4px"
                    clickable
                  />
                );
              })}
            </div>
          </header>
          <div>
            <h1 className={classes.h1}>Feed</h1>
          </div>
          <main className={classes.main}>
            <div className={classes.responsive}>
              <div className={classes.column}>
                {firstArr.map((each) => (
                  <PostCard
                    id={each.id}
                    image={each.image}
                    author={each.author}
                    author_pic={each.author_pic}
                    likes={each.likes}
                    comments={each.comments}
                    key={each.id}
                  />
                ))}
              </div>
              <div className={classes.column}>
                {secondArr.map((each) => (
                  <PostCard
                    id={each.id}
                    image={each.image}
                    author={each.author}
                    author_pic={each.author_pic}
                    likes={each.likes}
                    comments={each.comments}
                    key={each.id}
                  />
                ))}
              </div>
            </div>
            <div className={classes.responsive}>
              <div className={classes.column}>
                {thirdArr.map((each) => (
                  <PostCard
                    id={each.id}
                    image={each.image}
                    author={each.author}
                    author_pic={each.author_pic}
                    likes={each.likes}
                    comments={each.comments}
                    key={each.id}
                  />
                ))}
              </div>
              <div className={classes.column}>
                {fourthArr.map((each) => (
                  <PostCard
                    id={each.id}
                    image={each.image}
                    author={each.author}
                    author_pic={each.author_pic}
                    likes={each.likes}
                    comments={each.comments}
                    key={each.id}
                  />
                ))}
              </div>
            </div>
          </main>
        </section>
      )}
    </>
  );
};

export default HomeSection;
