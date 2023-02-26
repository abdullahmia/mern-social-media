import { useGetPostsQuery } from "../../../features/post/postApi";
import { useSuggestionUsersQuery } from "../../../features/user/userApi";
import PageLoader from "../../components/common/loaders/PageLoader";
import Post from "../../components/common/post/Post";
import Sidebar from "../../components/common/sidebar/Sidebar";
import Header from "../../components/common/ui/Header";
import Wrapper from "../../components/custom/Wrapper";

const Feed = () => {
  const { data: posts, isLoading: postLoading } = useGetPostsQuery();
  const { isLoading: suggestedLoading } = useSuggestionUsersQuery();

  return (
    <Wrapper title={"Instagram"}>
      {postLoading && suggestedLoading ? (
        <PageLoader />
      ) : (
        <>
          <Header />
          <div className="container mx-auto lg:px-12 px-5 flex gap-8 mt-5">
            <div className="lg:w-[490px] w-[430px]">
              <div>{/* Stories */}</div>
              <div className="flex flex-col gap-4 lg:mb-8 mb-20">
                {posts?.map((post, key) => (
                  <Post key={key} post={post} />
                ))}
              </div>
            </div>
            <div className="w-[383px] lg:block hidden">
              <Sidebar />
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Feed;
