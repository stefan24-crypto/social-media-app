import React from "react";
import { Comment } from "../../models";
import classes from "./PostCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ProfileCirlcle from "../../UI/ProfileCirlcle";
import { useNavigate } from "react-router";

interface PostCardProps {
  id: string;
  image: string;
  likes: number;
  comments: Comment[];
  author: string;
  author_pic: string;
  fixedHeight?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  image,
  likes,
  comments,
  author,
  author_pic,
  fixedHeight,
}) => {
  const navigate = useNavigate();
  return (
    <section className={classes.card}>
      <header onClick={() => navigate(`/post/${id}`)}>
        <img
          src={image}
          alt="post"
          className={classes.img}
          style={{
            height: fixedHeight ? fixedHeight : "auto",
            objectFit: fixedHeight ? "cover" : "contain",
          }}
        />
      </header>
      <main className={classes.main}>
        <div className={classes.profile}>
          <ProfileCirlcle
            src={author_pic}
            bgColor="#292929"
            height="30px"
            width="30px"
            paddingOnGradient="1.2px"
            paddingOnImage="2.4px"
          />
          <p>{author}</p>
        </div>
        <div className={classes.like_and_comments}>
          <div className={classes.likes}>
            <FontAwesomeIcon icon={faHeart} />
            <p>{likes}</p>
          </div>
          <div className={classes.comments}>
            <FontAwesomeIcon icon={faComment} />
            <p>{comments.length}</p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default PostCard;
