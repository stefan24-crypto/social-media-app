import React, { useRef } from "react";
import classes from "./PostDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import useFormatFollowers from "../../hooks/useFormatFollowers";
import SendIcon from "@mui/icons-material/Send";
import Comment from "./Comment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";

interface PostDetailProps {
  id: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ id }) => {
  const users = useAppSelector((state) => state.data.users);
  const posts = useAppSelector((state) => state.data.posts);
  const thisPost = posts.find((each) => each.id === id);
  const curUser = useAppSelector((state) => state.auth.curUser);
  const authorProfile = users.find((each) => each.name === thisPost?.author);
  const followerText = useFormatFollowers(
    authorProfile?.followers || [],
    "Follower"
  );
  const followingText = useFormatFollowers(
    authorProfile?.following || [],
    "Following"
  );
  const commentRef = useRef<HTMLInputElement>(null);

  if (!thisPost) return <h1>No Post Found</h1>;
  const addCommentHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentRef.current?.value.trim().length === 0) return;
    const postDoc = doc(db, "posts", thisPost.id);
    const unique_id = uuid();
    const newFields = {
      comments: [
        {
          id: unique_id,
          text: commentRef.current!.value,
          author: curUser?.displayName,
        },
        ...thisPost.comments,
      ],
    };
    await updateDoc(postDoc, newFields);
    commentRef.current!.value = "";
  };

  return (
    <section className={classes.section}>
      <div className={classes.first_container}>
        <header
          className={classes.header}
          style={{ backgroundImage: `url(${thisPost?.image})` }}
        >
          <div className={classes.info}>
            <div>
              <img
                src={thisPost?.author_pic}
                alt="profile_picture"
                className={classes.prof_pic}
              />
              <p>{thisPost?.author}</p>
            </div>
            <div>
              <p>{thisPost?.date.toDate().toDateString()}</p>
            </div>
          </div>
        </header>
        <main className={classes.content}>
          <div className={classes.stats}>
            <div>
              {thisPost?.tags.map((each) => (
                <p key={each}>#{each}</p>
              ))}
            </div>
            <div className={classes.likes_and_comments}>
              <div>
                <FontAwesomeIcon icon={faHeart} />
                <p>{thisPost?.likes}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faComment} />
                <p>{thisPost?.comments.length}</p>
              </div>
            </div>
          </div>
          <div className={classes.title}>
            <h1>{thisPost?.title}</h1>
          </div>
          <div className={classes?.followed}>
            <p>{followerText}</p>
            <p>{followingText}</p>
          </div>
        </main>
      </div>
      <div className={classes.comment_section}>
        <header className={classes.heading}>
          <h1>Comments</h1>
        </header>
        <main className={classes.comments}>
          <div className={classes.list}>
            {thisPost.comments.map((each) => (
              <Comment
                key={each.id}
                id={each.id}
                author={each.author}
                text={each.text}
              />
            ))}
          </div>
          <form className={classes.add_cmt} onSubmit={addCommentHandler}>
            <input type="text" placeholder="Add Comment" ref={commentRef} />
            <div>
              <SendIcon />
            </div>
          </form>
        </main>
      </div>
    </section>
  );
};

export default PostDetail;
