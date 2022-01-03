import React from "react";
import { useAppSelector } from "../../store/hooks";
import PostCard from "../Post/PostCard";
import classes from "./Category.module.css";

interface CategoryProps {
  category: string;
}

const Category: React.FC<CategoryProps> = ({ category }) => {
  const posts = useAppSelector((state) => state.data.posts);
  const thisCategoryPosts = posts.filter((each) => each.category === category);
  if (thisCategoryPosts.length === 0)
    return (
      <div className={classes.no_posts}>
        <h1>No Posts in this Category!</h1>
      </div>
    );
  return (
    <section>
      <header className={classes.header}>
        <h1>{category}</h1>
      </header>
      <main className={classes.posts}>
        {thisCategoryPosts.map((each) => (
          <PostCard
            key={each.id}
            id={each.id}
            author={each.author}
            author_pic={each.author_pic}
            likes={each.likes}
            comments={each.comments}
            image={each.image}
            fixedHeight="300px"
          />
        ))}
      </main>
    </section>
  );
};

export default Category;
