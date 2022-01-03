import React from "react";
import { useParams } from "react-router";
import Category from "../components/Category/Category";

const CategoryPage: React.FC = () => {
  const params = useParams();
  return <Category category={params.categoryID!} />;
};

export default CategoryPage;
