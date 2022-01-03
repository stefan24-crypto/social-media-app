import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import CategoryPage from "./Pages/CategoryPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { auth, db } from "./firebase";
import { authActions } from "./store/auth-slice";
import { collection, onSnapshot } from "firebase/firestore";
import { dataActions } from "./store/data-slice";
import AddPostPage from "./Pages/AddPostPage";
import PostDetailPage from "./Pages/PostDetailPage";
import { UIActions } from "./store/ui-slice";
import DmPage from "./Pages/DmPage";
import ChatRoomPage from "./Pages/ChatRoomPage";

//To Change DUMMY_POSTS: HomeSection, PostDetail, ProfileSection, Profile, Category.
//To Change DUMMY_DMS: Messages, ChatRoom
//Show notifications for messages and how many of them that haven't been read.
//change if (!something) to show loading spinner

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  //Authentication
  useEffect(() => {
    dispatch(UIActions.setIsLoading(true));
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(authActions.setUser(authUser));
      } else {
        dispatch(authActions.setUser(null));
      }
    });
    return () => {
      unsubscribe();
      dispatch(UIActions.setIsLoading(false));
    };
  }, []);

  //Figure Out a way to set all posts
  //Data
  useEffect(() => {
    dispatch(UIActions.setIsLoading(true));
    onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docs.map((doc) =>
        dispatch(
          dataActions.setUsers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        )
      );
      dispatch(UIActions.setIsLoading(false));
    });
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:profileID" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/category/:categoryID" element={<CategoryPage />} />
        <Route path="/add" element={<AddPostPage />} />
        <Route path="/post/:postID" element={<PostDetailPage />} />
        <Route path="/dm" element={<DmPage />} />
        <Route path="/dm/:chatroomID" element={<ChatRoomPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
