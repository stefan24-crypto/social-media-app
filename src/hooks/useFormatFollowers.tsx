import { Followers } from "../models";

const useFormatFollowers = (
  followersArray: Followers | [],
  FollowingOrFollower: "Following" | "Follower"
) => {
  if (followersArray.length < 3) return "";
  const firstThreeNames = followersArray.slice(0, 3).map((each) => each.name);
  const remainingNumber = followersArray.length - firstThreeNames.length;

  if (FollowingOrFollower === "Follower") {
    return `Followed by ${firstThreeNames.join(
      ", "
    )} and ${remainingNumber} more.`;
  } else {
    return `Following ${firstThreeNames.join(
      ", "
    )} and ${remainingNumber} more.`;
  }
};

export default useFormatFollowers;
