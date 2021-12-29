import React from "react";
import { useAppSelector } from "../../store/hooks";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./ProfileSection.module.css";

const ProfileSection: React.FC = () => {
  const curUser = useAppSelector((state) => state.auth.curUser);
  const allUsers = useAppSelector((state) => state.data.users);
  if (!curUser)
    return (
      <div className={classes.noUser}>
        <h1>Login</h1>
      </div>
    );
  const userProfile = allUsers.find(
    (each) => each.name === curUser?.displayName
  );
  if (!userProfile) return <h1>No user</h1>;
  console.log(userProfile);
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <ProfileCirlcle
          src={
            userProfile!.profile_pic ||
            "https://st3.depositphotos.com/4111759/13425/v/380/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg?forcejpeg=true"
          }
          bgColor="#121212"
        />
        <div>
          <h1>{userProfile.name}</h1>
        </div>
      </header>
      <main className={classes.main}>
        <div className={classes.stat}>
          <p>{userProfile.posts.length}</p>
          <span>Posts</span>
        </div>
        <div className={classes.vertical}></div>
        <div className={classes.stat}>
          <p>{userProfile.following.length}</p>
          <span>Following</span>
        </div>
        <div className={classes.vertical}></div>
        <div className={classes.stat}>
          <p>{userProfile.followers.length}</p>
          <span>Followers</span>
        </div>
      </main>
    </section>
  );
};

export default ProfileSection;
