import React from "react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import { useAppSelector } from "../../store/hooks";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./ProfileSection.module.css";
import { CircularProgress } from "@mui/material";

const ProfileSection: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const allUsers = useAppSelector((state) => state.data.users);
  const posts = useAppSelector((state) => state.data.posts);
  const isLoading = useAppSelector((state) => state.ui.isLoading);
  const userProfile = allUsers.find(
    (each) => each.name === curUser?.displayName
  );
  const { amount } = useGetUserPosts(userProfile || undefined, posts);

  if (!curUser) return <div className={classes.noUser}></div>;
  if (!userProfile) return <></>;
  // if (!userProfile) return <h1>No user</h1>;
  return (
    <>
      {isLoading ? (
        <div className="loading">
          <CircularProgress sx={{ color: "white" }} />
        </div>
      ) : (
        <section className={classes.section}>
          <header className={classes.header}>
            <ProfileCirlcle
              src={
                userProfile?.profile_pic ||
                "https://st3.depositphotos.com/4111759/13425/v/380/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg?forcejpeg=true"
              }
              bgColor="#121212"
              id={userProfile?.id}
              width="75px"
              height="75px"
              paddingOnGradient="1.5px"
              paddingOnImage="4px"
              clickable
            />
            <div>
              <h1>{userProfile?.name}</h1>
            </div>
          </header>
          <main className={classes.main}>
            <div className={classes.stat}>
              <p>{amount}</p>
              <span>Posts</span>
            </div>
            <div className={classes.vertical}></div>
            <div className={classes.stat}>
              <p>{userProfile?.following.length}</p>
              <span>Following</span>
            </div>
            <div className={classes.vertical}></div>
            <div className={classes.stat}>
              <p>{userProfile?.followers.length}</p>
              <span>Followers</span>
            </div>
          </main>
        </section>
      )}
    </>
  );
};

export default ProfileSection;
