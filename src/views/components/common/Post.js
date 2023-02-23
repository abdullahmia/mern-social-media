import moment from "moment";
import { AiOutlineEllipsis } from "react-icons/ai";
// prettier-ignore
import { useLikePostMutation } from '../../../features/post/postApi';

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePicture from "../custom/images/ProfilePicture";
import Image from "./Image";
import CommentInput from "./post/CommentInput";
import PostReaction from "./post/PostReaction";

const Post = ({ post = {} }) => {
  const { user } = useSelector((state) => state.auth);

  const isLiked = post?.likes?.includes(user?._id);

  const [likePost] = useLikePostMutation();

  // like handler
  const likePostHandler = async () => {
    if (!isLiked) await likePost(post?._id);
  };

  return (
    <div className="border rounded-[8px] background dark:border-[#2d343b]">
      <div className="p-3 flex justify-between items-center border-b dark:border-[#2d343b]">
        <div className="flex items-center gap-3">
          <div>
            <ProfilePicture src={post?.user?.image} className="w-[32px] h-[32px] rounded-full" />
          </div>
          <div>
            <Link to={`/${post?.user?.username}`} className="text-[14px] text-[#262626] dark:text-gray-100 font-[600]">
              {post?.user?.username}
            </Link>
          </div>
        </div>
        <div>
          <button>
            <AiOutlineEllipsis className="dark:text-gray-100" />
          </button>
        </div>
      </div>
      <div onDoubleClick={likePostHandler} className="cursor-pointer">
        <Image
          src={post?.image}
          classname="max-h-[530px] object-cover w-full"
        />
      </div>
      <div className="px-3 border-t dark:border-[#2d343b]">
        <PostReaction post={post} />
      </div>
      <div className="px-3 pb-3">
        <h4 className="text-[14px] text-[#262626] font-[700] dark:text-gray-200">
          {post?.likes?.length} likes
        </h4>
        <div className="flex gap-1 mt-2">
          <h2 className="text-[14px] text-[#262626] font-[700] dark:text-gray-200">
            {post?.user?.username}
          </h2>
          <span className="text-[14px] text-[#262626] dark:text-gray-300">
            {post?.caption}
          </span>
        </div>
        <Link to={`/p/${post?._id}`} className="text-[14px] text-[#8e8e8e] font-[400] mt-2">
          View all {post?.comments} comments
        </Link>
        <p className="uppercase text-[10px] text-[#8e8e8e] font-[400] mt-2">
          {moment(post.createAt).format("MMM Do YY")}
          {/* 11 hours ago */}
        </p>
      </div>

      <div className="px-3 border-t dark:border-[#2d343b]">
        <CommentInput post={post?._id} />
      </div>
    </div>
  );
};

export default Post;
