import React, { useEffect } from "react";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import FeedPage from "./Pages/FeedPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { auth, db } from "./firebase";
import { authActions } from "./store/auth-slice";
import { collection, onSnapshot } from "firebase/firestore";
import { dataActions } from "./store/data-slice";
import AddPostPage from "./Pages/AddPostPage";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  //Authentication
  const curUser = useAppSelector((state) => state.auth.curUser);
  const users = useAppSelector((state) => state.data.users);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(authActions.setUser(authUser));
      } else {
        dispatch(authActions.setUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Data
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docs.map((doc) =>
        dispatch(
          dataActions.setUsers(
            snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        )
      );
    });
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:profileID" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/add" element={<AddPostPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
