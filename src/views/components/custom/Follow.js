import { useSelector } from "react-redux";

import {
  useFollowMutation,
  useUnfollowMutation
} from "../../../features/user/userApi";

const Follow = ({ id, followers }) => {
  const { user: thisUser } = useSelector((state) => state.auth);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const isFollowed = followers?.find((user) => user._id === thisUser._id);

  // follow
  const followHandler = async () => {
    await follow(id);
    // .then((result) => {
    //   toast.custom((t) => (
    //     <div className="dark:bg-gray-700 bg-white dark:text-gray-300 mb-4 p-4 rounded-md shadow-md flex flex-col gap-9">
    //       <h2>{result?.data?.message}</h2>
    //     </div>
    //   ));
    // });
  };

  // unfollow
  const unfollowHandler = async () => {
    await unfollow(id);
    // .then((result) => {
    //   toast.custom((t) => (
    //     <div className="dark:bg-gray-700 bg-white dark:text-gray-300 mb-4 p-4 rounded-md shadow-md flex flex-col gap-9">
    //       <h2>{result?.data?.message}</h2>
    //     </div>
    //   ));
    // });
  };

  return !isFollowed ? (
    <button
      onClick={followHandler}
      className="bg-[#0095F6] text-sm py-1 px-5 rounded text-white"
    >
      Follow
    </button>
  ) : (
    <button
      onClick={unfollowHandler}
      className="bg-transparent border text-sm py-1 px-5 rounded text-gray-700"
    >
      unfollow
    </button>
  );
};

export default Follow;
