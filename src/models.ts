import { makeStyles } from "@mui/material";

export type Comment = { id: string; author: string; text: string };
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

type Message = { id: string; text: string; to: string; time: Date };
type People = { name: string; profile_pic: string };

export interface DM {
  id: string;
  people: [People, People];
  messages: Message[];
}

/*

//Array of different chatroooms

dm = [
  {
    id: c1
    to: coffeecoder,
    from: Elon Musk,
    messages: [{
      id: m1,
      text: 'Hi There'
      time: new Date()
    }]
  }
]

*/
