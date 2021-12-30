import React from "react";
import { useParams } from "react-router";
import Profile from "../components/Profile/Profile";

const ProfilePage: React.FC = () => {
  const params = useParams();
  return <Profile id={params.profileID!} />;
};

export default ProfilePage;
