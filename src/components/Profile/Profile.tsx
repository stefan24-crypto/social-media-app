import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import useFormatFollowers from "../../hooks/useFormatFollowers";
import { useAppSelector } from "../../store/hooks";
import Button from "../../UI/Button";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import classes from "./Profile.module.css";

interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const curUser = useAppSelector((state) => state.auth.curUser); // This is the current logged In user
  const users = useAppSelector((state) => state.data.users);
  const curUserProfile = users.find(
    (each) => each.name === curUser?.displayName
  );
  const clickedOnUserProfile = users.find((each) => each.id === id); // This is the user profile that has been clicked on!
  const briefFollowerDescription = useFormatFollowers(
    clickedOnUserProfile?.followers || [],
    "Follower"
  );
  const briefFollowingDescription = useFormatFollowers(
    clickedOnUserProfile?.following || [],
    "Following"
  );
  if (!clickedOnUserProfile) return <></>;
  let btn;

  //Prevent Users from following twice
  const followHandler = async () => {
    const isThere = clickedOnUserProfile.followers.find(
      (each) => each.name === curUserProfile!.name
    );
    if (isThere) return alert("You have already followed this person");
    const loggedInUserDoc = doc(db, "users", curUserProfile!.id);
    const newUserFields = {
      following: [
        {
          name: clickedOnUserProfile.name,
          profile_pic: clickedOnUserProfile.profile_pic,
        },
        ...curUserProfile!.following,
      ],
    };

    const clickedOnUserDoc = doc(db, "users", clickedOnUserProfile!.id);
    const newClickedOnFields = {
      followers: [
        {
          name: curUserProfile?.name,
          profile_pic: curUserProfile?.profile_pic,
        },
        ...clickedOnUserProfile.followers,
      ],
    };

    await updateDoc(loggedInUserDoc, newUserFields);
    await updateDoc(clickedOnUserDoc, newClickedOnFields);
  };

  if (curUser) {
    btn = <Button onClick={followHandler}>Follow</Button>;
  } else {
    btn = (
      <Button disabled={true} className={classes.disabled}>
        Follow
      </Button>
    );
  }
  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <div className={classes.content}>
          <div className={classes.img_div}>
            <div className={classes.inner}>
              <img
                src={clickedOnUserProfile.profile_pic!}
                className={classes.profile}
                alt="profile"
              />
            </div>
          </div>
          <div className={classes.user_info}>
            <h1>{clickedOnUserProfile.name}</h1>
          </div>
        </div>
        <div className={classes.info}>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>{clickedOnUserProfile.posts.length}</p>
              <span>Posts</span>
            </div>
            <div className={classes.stat}>
              <p>{clickedOnUserProfile.followers.length}</p>
              <span>Followers</span>
            </div>
            <div className={classes.stat}>
              <p>{clickedOnUserProfile.following.length}</p>
              <span>Following</span>
            </div>
          </div>
          <div className={classes.desc}>
            <p>{briefFollowingDescription}</p>
            <p>{briefFollowerDescription}</p>
          </div>
          <div className={classes.btns}>
            {curUser?.displayName === clickedOnUserProfile.name ? (
              <Button>Edit Profile</Button>
            ) : (
              btn
            )}
          </div>
        </div>
      </header>
      <main></main>
    </section>
  );
};

export default Profile;
