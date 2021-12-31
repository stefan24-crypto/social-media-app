export type Comment = { id: string; author: string; text: string; time: Date };
type Category =
  | "Painting"
  | "Portrait"
  | "Technolgoy"
  | "Cars"
  | "Outdoors"
  | "Coding"
  | "Finance"
  | "Sports"
  | "Philanthropy";

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
  category: Category;
}

type Follower = { name: string; profile_pic: string };

export type Followers = Follower[] | [];

export interface User {
  id: string;
  name: string;
  profile_pic: string;
  followers: Followers;
  following: Followers;
}

export const Categories = [
  "Painting",
  "Portrait",
  "Technolgoy",
  "Cars",
  "Outdoors",
  "Coding",
  "Finance",
  "Sports",
  "Philanthropy",
];
