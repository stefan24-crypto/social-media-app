import { Post, User } from "../models";

const useGetUserPosts = (curUser: User | undefined, posts: Post[]) => {
  let amount = 0;
  const thisUserPosts = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].author === curUser?.name) {
      amount += 1;
      thisUserPosts.push(posts[i]);
    }
  }
  return { amount, thisUserPosts };
};

export default useGetUserPosts;
