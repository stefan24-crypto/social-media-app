import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { auth, db } from "../../firebase";
import useFormatFollowers from "../../hooks/useFormatFollowers";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import { useAppSelector } from "../../store/hooks";
import Button from "../../UI/Button";
import PostCard from "../Post/PostCard";
import AddBio from "./AddBio";
import classes from "./Profile.module.css";

interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [showEdit, setShowEdit] = useState(false);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const dms = useAppSelector((state) => state.data.dms);
  const users = useAppSelector((state) => state.data.users);
  const curUserProfile = users.find(
    (each) => each.name === curUser?.displayName
  );
  const posts = useAppSelector((state) => state.data.posts);
  const yourMessages = dms.filter((each) =>
    each.people.find((person) => person.name === curUser?.displayName)
  );
  const navigate = useNavigate();
  const clickedOnUserProfile = users.find((each) => each.id === id);
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
    const followingAlready = clickedOnUserProfile?.followers.find(
      (each) => each.name === curUserProfile?.name
    );
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

  const deleteProfileHandler = async () => {
    const goAhead = prompt("Are you Sure you want to delete you profile? ");
    if (
      goAhead === "yes" ||
      goAhead === "Yes" ||
      goAhead === "yh" ||
      goAhead === "Yh"
    ) {
      //remove all posts
      if (thisUserPosts.length !== 0) {
        thisUserPosts.forEach(async (each) => {
          const postDoc = doc(db, "posts", each.id);
          await deleteDoc(postDoc);
        });
      }

      //Remove all DM's
      if (yourMessages.length !== 0) {
        yourMessages.forEach(async (each) => {
          const dmDoc = doc(db, "dms", each.id);
          await deleteDoc(dmDoc);
        });
      }

      //Remove from all the People Followed
      users.forEach(async (each, index) => {
        const userDoc = doc(db, "users", each.id);
        const newFields = {
          followers: each.followers.filter(
            (item) => item.name !== curUser?.displayName
          ),
        };
        await updateDoc(userDoc, newFields);
      });

      //Remove from all the People he is Following
      users.forEach(async (each, index) => {
        const userDoc = doc(db, "users", each.id);
        const newFields = {
          following: each.following.filter(
            (item) => item.name !== curUser?.displayName
          ),
        };
        await updateDoc(userDoc, newFields);
      });

      // update users
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);

      //Delete From Firebase Auth
      auth.currentUser?.delete();
      auth.signOut();
      navigate("/");
    }
  };

  return (
    <>
      {showEdit && <AddBio closeModal={() => setShowEdit(false)} id={id} />}
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
              <h1>{clickedOnUserProfile?.name}</h1>
            </div>
          </div>
          <div className={classes.info}>
            <div className={classes.stats}>
              <div className={classes.stat}>
                <p>{amount}</p>
                <span>Posts</span>
              </div>
              <div className={classes.stat}>
                <p>{clickedOnUserProfile?.followers.length}</p>
                <span>Followers</span>
              </div>
              <div className={classes.stat}>
                <p>{clickedOnUserProfile?.following.length}</p>
                <span>Following</span>
              </div>
            </div>
            <div className={classes.bio}>
              <p>{clickedOnUserProfile?.bio}</p>
            </div>
            <div className={classes.desc}>
              <p>{briefFollowingDescription}</p>
              <p>{briefFollowerDescription}</p>
            </div>
            <div className={classes.btns}>
              {curUser?.displayName === clickedOnUserProfile.name ? (
                <div className={classes.your_profile_btns}>
                  <Button onClick={() => setShowEdit(true)}>Add Bio</Button>
                  <Button
                    className={classes.del}
                    onClick={deleteProfileHandler}
                  >
                    Delete Profile
                  </Button>
                </div>
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
          {thisUserPosts?.map((each) => (
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
                curUser?.displayName === clickedOnUserProfile.name
                  ? true
                  : false
              }
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default Profile;
