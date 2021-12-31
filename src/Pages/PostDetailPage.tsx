import React from "react";
import { useParams } from "react-router";
import PostDetail from "../components/Post/PostDetail";

const PostDetailPage: React.FC = () => {
  const params = useParams();
  return <PostDetail id={params.postID!} />;
};

export default PostDetailPage;
