import React from "react";
import { DUMMTY_POSTS } from "../../dummy_posts";
import classes from "./PostDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import useFormatFollowers from "../../hooks/useFormatFollowers";
import SendIcon from "@mui/icons-material/Send";

interface PostDetailProps {
  id: string;
}

const PostDetail: React.FC<PostDetailProps> = ({ id }) => {
  const users = useAppSelector((state) => state.data.users);
  const thisPost = DUMMTY_POSTS.find((each) => each.id === id);
  const authorProfile = users.find((each) => each.name === thisPost?.author);
  const followerText = useFormatFollowers(
    authorProfile?.followers || [],
    "Follower"
  );
  const followingText = useFormatFollowers(
    authorProfile?.following || [],
    "Following"
  );
  if (!thisPost) return <h1>No Post Found</h1>;
  return (
    <section className={classes.section}>
      <div className={classes.first_container}>
        <header
          className={classes.header}
          style={{ backgroundImage: `url(${thisPost.image})` }}
        >
          <div className={classes.info}>
            <div>
              <img
                src={thisPost?.author_pic}
                alt="profile_picture"
                className={classes.prof_pic}
              />
              <p>{thisPost.author}</p>
            </div>
            <div>
              <p>{thisPost.date.toDateString()}</p>
            </div>
          </div>
        </header>
        <main className={classes.content}>
          <div className={classes.stats}>
            <div>
              {thisPost.tags.map((each) => (
                <p key={each}>#{each}</p>
              ))}
            </div>
            <div className={classes.likes_and_comments}>
              <div>
                <FontAwesomeIcon icon={faHeart} />
                <p>{thisPost.likes}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faComment} />
                <p>{thisPost.comments.length}</p>
              </div>
            </div>
          </div>
          <div className={classes.title}>
            <h1>{thisPost.title}</h1>
          </div>
          <div className={classes.followed}>
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
          {/* Comments go here! */}
          <div className={classes.list}>
            <p>First Comment</p>
          </div>
          <div className={classes.add_cmt}>
            <input type="text" />
            <SendIcon />
          </div>
        </main>
      </div>
    </section>
  );
};

export default PostDetail;
