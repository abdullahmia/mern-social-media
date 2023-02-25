import { useSelector } from "react-redux";

import {
  useFollowMutation,
  useUnfollowMutation
} from "../../../features/user/userApi";
import Loader from "../common/loaders/Loader";

const Follow = ({ id, followers }) => {
  const { user: thisUser } = useSelector((state) => state.auth);
  const [follow, {isLoading: followLoading}] = useFollowMutation();
  const [unfollow, {isLoading: unFollowLoading}] = useUnfollowMutation();
  const isFollowed = followers.find((follower) => follower === thisUser._id);

  // follow
  const followHandler = async () => {
    await follow(id);

  };

  // unfollow
  const unfollowHandler = async () => {
    await unfollow(id);

  };

  return !isFollowed ? (
    <button
      onClick={followHandler}
      className="bg-[#0095F6] text-sm py-1 px-5 rounded text-white"
    >
      {followLoading ? <Loader /> : "Follow"}
    </button>
  ) : (
    <button
      onClick={unfollowHandler}
      className="bg-transparent border text-sm py-1 px-5 rounded text-gray-700"
    >
      {unFollowLoading ? <Loader /> : "Unfollow"}
    </button>
  );
};

export default Follow;
