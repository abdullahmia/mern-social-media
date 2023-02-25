import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFollowMutation, useUnfollowMutation } from "../../../../features/user/userApi";
import ProfilePicture from '../../custom/images/ProfilePicture';
import Loader from "../loaders/Loader";


const SuggestedProfile = ({ user }) => {
  const { user: currentUser } = useSelector((state) => state.auth);

  // follow user
  const [follow, {isLoading: followLoading}] = useFollowMutation();
  const followHandler = async () => {
    await follow(user?._id).then((res) => {});
  };

  // unfollow a user
  const [unfollow, {isLoading: unFollowLoading}] = useUnfollowMutation();
  const unfollowHandler = async () => {
    await unfollow(user?._id).then((res) => {});
  };

  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex gap-3">
        <div>
          {/* <img
            src="https://picsum.photos/200"
            alt=""
            className="w-[32px] h-[32px] rounded-full"
          /> */}
          <ProfilePicture src={user.image} className="w-[32px] h-[32px] rounded-full" />
        </div>
        <div>
          <Link
            to={`/${user?.username}`}
            className="text-[14px] text-[#262626] dark:text-gray-400 font-[700]"
          >
            {user?.username}
          </Link>
          <h3 className="text-[12px] text-[#8e8e8e] font-[400]">
            {user?.fullName}
          </h3>
        </div>
      </div>
      <div>
        {user?.followers.includes(currentUser._id) ? (
          <button
            onClick={unfollowHandler}
            className="text-[12px] font-[700] text-[#0095f6] capitalize"
          >
            {unFollowLoading ? <Loader /> : 'Unfollow'}
          </button>
        ) : (
          <button
            onClick={followHandler}
            className="text-[12px] font-[700] text-[#0095f6] capitalize"
          >
            {
              followLoading ? <Loader /> : "follow"
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default SuggestedProfile;
