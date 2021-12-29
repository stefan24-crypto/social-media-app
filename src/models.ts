type Comment = { id: string; author: string; text: string; time: Date };

export interface Post {
  id: string;
  title: string;
  image: string;
  date: Date;
  author: string;
  author_pic: string;
  tags: string[];
  comments: Comment[];
  likes: number;
}

type Follower = { name: string; profile_pic: string };
type Followers = Follower[] | [];
type Following = Follower[] | [];

export interface User {
  id: string;
  name: string;
  profile_pic: string;
  followers: Followers;
  following: Following;
  posts: Post[] | [];
}
