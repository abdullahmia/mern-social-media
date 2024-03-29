import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import verifiedBadge from '../../../assets/verified.png';
import { useUserDataQuery } from "../../../features/user/userApi";
import Loader from "../../components/common/loaders/Loader";
import Highlight from "../../components/common/profile/Highlight";
import Posts from "../../components/common/profile/Posts";
import ProfileOptions from "../../components/common/profile/ProfileOption";
import Footer from "../../components/common/ui/Footer";
import Header from "../../components/common/ui/Header";
import NotFound from "../../components/common/ui/NotFound";
import Follow from "../../components/custom/Follow";
import ProfilePicture from "../../components/custom/images/ProfilePicture";
import Wrapper from "../../components/custom/Wrapper";

const Profile = () => {
  const { username } = useParams();
  const { data, isLoading, isError } = useUserDataQuery(username);
  let user = data?.user;
  let posts = data?.posts;
    
  const { user: localUser } = useSelector((state) => state.auth);

  return (
    <Wrapper
      title={
        isLoading
          ? "Instagram"
          : user?.fullName
          ? `${user?.fullName} (@${user?.username})`
          : "Page not found"
      }
    >
      <Header />
      {isLoading ? (
        <div className="background h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {isError ? (
            <NotFound />
          ) : (
            <div className="container mx-auto">
              <div className="flex lg:items-center items-start lg:gap-16 gap-5 lg:px-14 px-3 lg:py-8 py-4">
                <div className="w-[20%]">
                  <ProfilePicture
                    src={user?.image}
                    className="lg:w-[100px] lg:h-[100px] w-[50px] h-[50px] rounded-full object-cover"
                  />
                </div>
                <div className="w-[80%] flex flex-col gap-4">
                  <div className="flex items-center lg:gap-5 gap-2">
                    <div className="flex items-center gap-1">
                        <h2 className="text-[28px] text-[#262626] font-[300] dark:text-gray-300">
                          {user?.username}
                        </h2>
                        {user?.isVerified && <img src={verifiedBadge} className="w-5 h-5" alt="verified" />}
                    </div>
                    
                    
                    
                    {localUser._id === user?._id ? (
                      <Link
                        to={"/account/edit"}
                        className="text-[14px] text-[#262626] font-[600] border dark:border-gray-600 dark:text-gray-400 px-2 py-2 rounded lg:block hidden"
                      >
                        Edit profile
                      </Link>
                    ) : (
                      <Follow id={user?._id} followers={user?.followers} />
                    )}
                    <ProfileOptions profile={user} />
                  </div>

                  {localUser._id === user?._id && <button className="text-[14px] text-[#262626] font-[600] border px-2 py-1 rounded lg:hidden block dark:border-gray-600 dark:text-gray-400">
                    Edit profile
                  </button>}


                  <div className="lg:block hidden">
                    <div className="flex items-center gap-10">
                      <h3 className="text-[#262626] dark:text-gray-400 text-[16px] font-[400]">
                        <span className="font-semibold">{posts?.length}</span>{" "}
                        posts
                      </h3>
                      <h3 className="text-[#262626] dark:text-gray-400 text-[16px] font-[400]">
                        <span className="font-semibold">
                          {user?.followers?.length}
                        </span>{" "}
                        followers
                      </h3>
                      <h3 className="text-[#262626] dark:text-gray-400 text-[16px] font-[400]">
                        <span className="font-semibold">
                          {user?.following?.length}
                        </span>{" "}
                        following
                      </h3>
                    </div>
                  </div>
                      <div className="flex flex-col gap-1">
                    <h2 className="text-[#262626] dark:text-gray-300 text-[16px] font-[600]">
                      {user?.fullName}
                    </h2>
                    {user?.bio && (
                      <p className="text-[#262626] dark:text-gray-400 text-[16px] font-[400]">
                        {user?.bio}
                      </p>
                    )}

                    {user?.website && (
                      <Link
                        to="/"
                            className="text-[#00376b] break-words dark:text-blue-500 text-[16px] font-[700] hover:underline transition"
                      >
                        {user?.website}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5">
                {/* Featured */}
                <div className="flex items-center lg:gap-10 gap-3">
                  <Highlight />
                  <Highlight />
                  <Highlight />
                  <Highlight />
                </div>
              </div>
              {/* post tab */}
              <div className="mt-10 border-t flex items-center justify-center dark:border-[#2d343b]">
                <div className="flex items-center gap-10">
                  <button className="flex items-center gap-2 uppercase border-t border-gray-900 py-3 dark:border-gray-400 dark:text-gray-200">
                    <svg
                      aria-label=""
                      fill="#262626"
                      height="12"
                      role="img"
                      viewBox="0 0 24 24"
                      width="12"
                    >
                      <rect
                        fill="none"
                        height="18"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        width="18"
                        x="3"
                        y="3"
                      ></rect>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="9.015"
                        x2="9.015"
                        y1="3"
                        y2="21"
                      ></line>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="14.985"
                        x2="14.985"
                        y1="3"
                        y2="21"
                      ></line>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="21"
                        x2="3"
                        y1="9.015"
                        y2="9.015"
                      ></line>
                      <line
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        x1="21"
                        x2="3"
                        y1="14.985"
                        y2="14.985"
                      ></line>
                    </svg>
                    <span className="text-[15px] text-[#262626] dark:text-gray-200">
                      {" "}
                      post{" "}
                    </span>
                  </button>
                  <button className="flex items-center gap-2 uppercase py-3">
                    <svg
                      aria-label=""
                      className="_ab6-"
                      color="#262626"
                      fill="#262626"
                      height="12"
                      role="img"
                      viewBox="0 0 24 24"
                      width="12"
                    >
                      <polygon
                        fill="none"
                        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></polygon>
                    </svg>
                    <span className="text-[15px] text-[#262626] dark:text-gray-200">
                      saved
                    </span>
                  </button>
                  <button className="flex items-center gap-2 uppercase py-3">
                    <svg
                      aria-label=""
                      color="#262626"
                      fill="#262626"
                      height="12"
                      role="img"
                      viewBox="0 0 24 24"
                      width="12"
                    >
                      <path
                        d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <path
                        d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></path>
                      <circle
                        cx="12.072"
                        cy="11.075"
                        fill="none"
                        r="3.556"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      ></circle>
                    </svg>
                    <span className="text-[15px] text-[#262626] dark:text-gray-200">
                      tagged
                    </span>
                  </button>
                </div>
              </div>
              {/* posts */}
              <Posts posts={posts} />

              {/* Footer menu */}
              <Footer />
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Profile;
