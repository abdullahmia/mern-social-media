import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { useGetPostQuery } from "../../../features/post/postApi";
import Header from "../../components/common/Header";
import Image from "../../components/common/Image";
import CommentInput from "../../components/common/post/CommentInput";
import Comments from "../../components/common/post/Comments";
import PostOptions from "../../components/common/post/PostOptions";
import PostReaction from "../../components/common/post/PostReaction";
import Posts from "../../components/common/profile/Posts";
import ProfilePicture from '../../components/custom/images/ProfilePicture';
import Wrapper from "../../components/custom/Wrapper";

const Post = () => {
  const {postId} = useParams();

  const { data, isLoading } = useGetPostQuery(postId);
  
  const { post, comments, relatedPosts } = data || {};
  console.log(relatedPosts);

  return (
    <Wrapper title={isLoading ? 'Loading...' : post.caption}>
      <Header />
      {
        isLoading ? <div>Loading...</div> : <div className="container mx-auto">
          <div className="mt-5 lg:mx-16 flex lg:flex-row flex-col border dark:border-[#2d343b]">
            <div className="flex-1 w-[65%] h-full">
              <Image src={post?.image} classname="h-[595px] object-cover w-full" />

            </div>
            <div className="w-[35%]">
              <div className="py-5 px-5 flex justify-between items-center border-b dark:border-[#2d343b]">
                <div className="flex items-center gap-3">
                  <Link to={`/${post.user.username}`}>
                    <ProfilePicture src={post.user.image} className="w-[32px] h-[32px] rounded-full" />
                  </Link>
                  <Link to={`/${post.user.username}`}>
                    <h2 className="text-[14px] text-[#262626] dark:text-gray-100 font-[600]">
                      {post.user.username}
                    </h2>
                  </Link>
                </div>
                <div>
                  <PostOptions postId={post?._id} username={post.user.username} />
                </div>
              </div>

              <div className="py-5 px-5 h-auto">
                <div className="flex items-center gap-3">
                  <Link to={`/${post.user.username}`}>
                    <Image src={post.user.image ? post.user.image : 'social-media/user_wxjx6f'} classname="w-[32px] h-[32px] rounded-full" />
                  </Link>
                  <div className="flex">
                    <Link to={`/${post.user.username}`} className="text-[14px] text-[#262626] dark:text-gray-100 font-[600]">
                      {post.user.username}
                    </Link>
                  </div>
                </div>
                {/* Caption */}
                <div className="mt-3">
                  <p className="text-[14px] text-[#262626] font-[400] dark:text-gray-300">
                    {post.caption}
                  </p>
                </div>

                {/* Comments */}
                <div className="">
                  <Comments comments={comments} />
                </div>
              </div>
              {/* likes, comment, share, saves */}
              <div className="px-5 border-t dark:border-[#2d343b]">
                <PostReaction post={post} />
              </div>




              <div className="px-5">
                <h2 className="text-[14px] text-[#262626] font-[700] dark:text-gray-300">
                  {post.likes.length === 0 ? `${post.likes.length} like` : `${post.likes.length} likes`}
                </h2>
                <p className="text-[11px] text-[#8e8e8e] font-[400]">
                  {moment(post.createdAt).fromNow()}
                </p>
              </div>

              {/* Comment Input */}
              <div className="mt-3 border-t dark:border-[#2d343b]">
                <CommentInput post={post._id} />
              </div>
              
            </div>
          </div>

          <div className="border-t dark:border-[#2d343b] mt-10  py-8">
            <h3 className="text-[14px] font-[700] text-[#8e8e8e] mb-4">
              More posts form{" "}
              <span className="text-[#262626]"> {post.user.username}</span>
            </h3>
            <Posts posts={relatedPosts} />
          </div>
        </div>
      }
    </Wrapper>
  );
};

export default Post;
