import { doc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../firebase";
import useFormatFollowers from "../../hooks/useFormatFollowers";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import { useAppSelector } from "../../store/hooks";
import Button from "../../UI/Button";
import PostCard from "../Post/PostCard";
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
  const posts = useAppSelector((state) => state.data.posts);
  const clickedOnUserProfile = users.find((each) => each.id === id); // This is the user profile that has been clicked on!
  const { amount, thisUserPosts } = useGetUserPosts(
    clickedOnUserProfile,
    posts
  );
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

  //Logic for choosing which button to render!
  if (curUser) {
    const followingAlready = clickedOnUserProfile.followers.find(
      (each) => each.name === curUserProfile!.name
    );
    console.log(followingAlready);
    if (followingAlready) {
      btn = (
        <Button disabled={true} className={classes.disabled}>
          Followed
        </Button>
      );
    } else {
      btn = <Button onClick={followHandler}>Follow</Button>;
    }
  } else {
    btn = null;
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
              <p>{amount}</p>
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
      <div className={classes.heading}>
        <h1>Posts</h1>
      </div>
      <main className={classes.posts}>
        {thisUserPosts.map((each) => (
          <PostCard
            id={each.id}
            image={each.image}
            likes={each.likes}
            comments={each.comments}
            key={each.id}
            author={each.author}
            author_pic={each.author_pic}
            fixedHeight="350px"
            curUserPost={
              curUser?.displayName === clickedOnUserProfile.name ? true : false
            }
          />
        ))}
      </main>
    </section>
  );
};

export default Profile;
