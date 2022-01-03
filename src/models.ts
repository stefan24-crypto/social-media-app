import { makeStyles } from "@mui/material";
import { Timestamp } from "firebase/firestore";

export type Comment = { id: string; author: string; text: string };

export interface Post {
  id: string;
  title: string;
  image: string;
  date: Timestamp;
  author: string;
  author_pic: string;
  tags: string[];
  comments: Comment[];
  likes: number;
  category: string;
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

type Message = {
  id: string;
  text: string;
  to: string;
  time: Timestamp;
  author: string;
};
type People = { name: string; profile_pic: string };

export interface DM {
  id: string;
  people: [People, People];
  messages: Message[];
  receiverHasRead: boolean;
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
