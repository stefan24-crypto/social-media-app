import { Post } from "./models";

export const DUMMTY_POSTS: Post[] = [
  {
    id: "p1",
    title: "Going to the Beach",
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2NlYW4lMjBiZWFjaHxlbnwwfHwwfHw%3D&w=1000&q=80",
    author: "coffeecoder",
    author_pic: "https://wallpapercave.com/wp/wp9109396.jpg",
    date: new Date(2021, 6, 11),
    tags: ["Amazing", "Looks gorgeous"],
    comments: [],
    category: "Outdoors",
    likes: 8,
  },
  {
    id: "p2",
    title: "Learning Typescript",
    image:
      "https://c0.wallpaperflare.com/preview/235/887/820/apple-coder-coding-internet.jpg",
    author: "Bill Gates",
    author_pic:
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987",
    date: new Date(2021, 7, 11),
    tags: ["100daysofcode", "That's amazing"],
    comments: [
      {
        id: "c1",
        text: "This is great, hope you get through",
        author: "Warren Buffet",
        time: new Date(2021, 8, 12),
      },
    ],
    category: "Coding",
    likes: 17,
  },
  {
    id: "p3",
    title: "Just got a new Lambo",
    image:
      "https://images.unsplash.com/photo-1617138224472-c835247ce42a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
    author: "Lionel Messi",
    author_pic:
      "https://cdnuploads.aa.com.tr/uploads/Contents/2021/07/17/thumbs_b_c_20a049d5a880e1c07728b8edabc68ac1.jpg?v=235925",
    date: new Date(2021, 12, 11),
    tags: ["happylife", "wowww"],
    comments: [
      {
        id: "c1",
        text: "That car is gorgeous",
        author: "Cristiano Ronaldo",
        time: new Date(2021, 12, 12),
      },
    ],
    category: "Cars",
    likes: 56,
  },
  {
    id: "p4",
    title: "Just finished a game!",
    image:
      "https://icdn.football-espana.net/wp-content/uploads/2021/10/Lionel-Messi.jpeg",
    author: "Lionel Messi",
    author_pic:
      "https://cdnuploads.aa.com.tr/uploads/Contents/2021/07/17/thumbs_b_c_20a049d5a880e1c07728b8edabc68ac1.jpg?v=235925",
    date: new Date(2021, 12, 11),
    tags: ["happylife", "wowww"],
    comments: [
      {
        id: "c1",
        text: "We could have won",
        author: "Cristiano Ronaldo",
        time: new Date(2021, 12, 12),
      },
    ],
    category: "Sports",
    likes: 56,
  },
  {
    id: "p5",
    title: "Just invested 1 million in bitcoin!",
    image:
      "https://images.squarespace-cdn.com/content/v1/54e92beae4b05bee39ff651c/1548286442421-WEIXLALPP2SSRFIEAED9/IMG_2550.jpeg?format=750w",
    author: "Warren Buffet",
    author_pic:
      "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fdam%2Fimageserve%2F9e2c3b55d3634cba9f2e2b21787e7489%2F0x0.jpg%3Ffit%3Dscale",
    date: new Date(2021, 12, 11),
    tags: ["happylife", "wowww"],
    comments: [
      {
        id: "c1",
        text: "Great Job Warren",
        author: "Bill Gates",
        time: new Date(2021, 12, 12),
      },
    ],
    category: "Finance",
    likes: 56,
  },
  {
    id: "p6",
    title: "Just donated 2 million dollars to team seas!",
    image:
      "https://image.evoke.org/-/media/Images/Evoke/Contributors/BillGates/BillGates_Headshot.ashx?rev=e0ff333fd52a433a9f33fbd03797ad04&hash=E08025CD7B6E07214B21ED04F7251BD0",
    author: "Bill Gates",
    author_pic:
      "https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f4ebe0c87612dab4f12a597%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D292%26cropX2%3D3684%26cropY1%3D592%26cropY2%3D3987",
    date: new Date(2021, 12, 11),
    tags: ["great", "savingtheworld"],
    comments: [
      {
        id: "c1",
        text: "Great Job Bill",
        author: "Warren Buffet",
        time: new Date(2021, 12, 12),
      },
    ],
    category: "Philanthropy",
    likes: 102,
  },
  {
    id: "p7",
    title: "Just drew this!",
    image: "https://cdn.wallpapersafari.com/49/19/EsxCP5.jpg",
    author: "coffeecoder",
    author_pic: "https://wallpapercave.com/wp/wp9109396.jpg",
    date: new Date(2021, 12, 11),
    tags: ["happylife", "wowww"],
    comments: [
      {
        id: "c1",
        text: "Great Job",
        author: "Bill Gates",
        time: new Date(2021, 12, 12),
      },
    ],
    category: "Painting",
    likes: 41,
  },
];
