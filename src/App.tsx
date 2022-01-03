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

//Change where using displayName to check to Email.

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

  useEffect(() => {
    dispatch(UIActions.setIsLoading(true));
    onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.docs.map((doc) =>
        dispatch(
          dataActions.setPosts(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        )
      );
      dispatch(UIActions.setIsLoading(false));
    });
  }, []);

  useEffect(() => {
    dispatch(UIActions.setIsLoading(true));
    onSnapshot(collection(db, "dms"), (snapshot) => {
      snapshot.docs.map((doc) =>
        dispatch(
          dataActions.setDms(
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
