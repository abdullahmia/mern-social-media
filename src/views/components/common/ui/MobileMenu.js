import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../../features/auth/authSlice";
import { useGetConversationsQuery } from "../../../../features/conversation/conversationApi";
import ProfilePicture from "../../custom/images/ProfilePicture";
import Switcher from "../../custom/Switcher";
import Notifications from "../notification/Notifications";
import AddPost from "../post/AddPost";

const MobileMenu = () => {
    const [unreadMessages, setUnreadMessages] = useState(null);
    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // unread conversations
    const { data: conversations } = useGetConversationsQuery();
    useEffect(() => {

        if (conversations) {
            const unread = conversations.filter((conversation) => {
                return !conversation.seen.includes(user?._id);
            });

            setUnreadMessages(unread.length);
        }

    }, [conversations, user?._id])



    // logout function
    const logout = () => {
        dispatch(userLoggedOut());
        navigate("/login");
    };
  return (
    <div class="fixed bottom-0 w-full py-2 px-12 background border-t dark:border-[#2d343b]">
       <div className="flex justify-between">
              <div>
                  <Link to="/">
                      <svg
                          aria-label="Home"
                          className="dark:text-gray-200"
                          color="#262626"
                          fill="#262626"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                      >
                          <path
                              d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth="2"
                          ></path>
                      </svg>
                  </Link>
              </div>
              <div>
                  <AddPost />
              </div>
              <div>
                  <Link to="/direct" className="relative focus:outline-none">
                      <svg
                          aria-label="Messenger"
                          className="dark:text-gray-200"
                          color="#262626"
                          fill="#262626"
                          height="24"
                          role="img"
                          viewBox="0 0 24 24"
                          width="24"
                      >
                          <path
                              d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z"
                              fill="none"
                              stroke="currentColor"
                              strokeMiterlimit="10"
                              strokeWidth="1.739"
                          ></path>
                          <path
                              d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z"
                              fillRule="evenodd"
                          ></path>
                      </svg>
                      {unreadMessages > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs text-white w-4 h-4 flex items-center justify-center">
                              {unreadMessages}
                          </span>
                      )}
                  </Link>
              </div>

              <div>
                  <Notifications />
              </div>
              
              <Menu as={"div"} className="relative">
                  <Menu.Button className="flex">
                      <ProfilePicture src={user?.image} className="w-[24px] h-[24px] rounded-full object-cover" />
                  </Menu.Button>

                  <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                  >
                      <Menu.Items className="absolute right-[0px] top-[-218px] z-10 mt-2 w-56 origin-top-right rounded-md background shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  dark:border-[#2d343b]">
                          <div className="py-1">
                              <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownDefault"
                              >
                                  <li className="">
                                      <Link
                                          to={`/${user?.username}`}
                                          className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-4 text-[#262626] dark:text-gray-300"
                                      >
                                          <svg
                                              aria-label="Profile"
                                              className="dark:text-gray-300"
                                              color="#262626"
                                              fill="#262626"
                                              height="16"
                                              role="img"
                                              viewBox="0 0 24 24"
                                              width="16"
                                          >
                                              <circle
                                                  cx="12.004"
                                                  cy="12.004"
                                                  fill="none"
                                                  r="10.5"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeMiterlimit="10"
                                                  strokeWidth="2"
                                              ></circle>
                                              <path
                                                  d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeMiterlimit="10"
                                                  strokeWidth="2"
                                              ></path>
                                              <circle
                                                  cx="12.006"
                                                  cy="9.718"
                                                  fill="none"
                                                  r="4.109"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeMiterlimit="10"
                                                  strokeWidth="2"
                                              ></circle>
                                          </svg>
                                          Profile
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to={"/"}
                                          className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-4 text-[#262626] dark:text-gray-300"
                                      >
                                          <svg
                                              aria-label="Saved"
                                              className="dark:text-gray-300"
                                              color="#262626"
                                              fill="#262626"
                                              height="16"
                                              role="img"
                                              viewBox="0 0 24 24"
                                              width="16"
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
                                          Saved
                                      </Link>
                                  </li>
                                  <li>
                                      <Link
                                          to={"/account/edit"}
                                          className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-4 text-[#262626] dark:text-gray-300"
                                      >
                                          <svg
                                              aria-label="Settings"
                                              className="dark:text-gray-300"
                                              color="#262626"
                                              fill="#262626"
                                              height="16"
                                              role="img"
                                              viewBox="0 0 24 24"
                                              width="16"
                                          >
                                              <circle
                                                  cx="12"
                                                  cy="12"
                                                  fill="none"
                                                  r="8.635"
                                                  stroke="currentColor"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                              ></circle>
                                              <path
                                                  d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                              ></path>
                                          </svg>
                                          Settings
                                      </Link>
                                  </li>
                                  <li className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                      <button className="w-full flex items-center gap-4 text-[#262626] dark:text-gray-300">
                                          <Switcher />
                                          Theme
                                      </button>
                                  </li>
                                  <li className="border-t mt-1 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white dark:border-gray-800 ">
                                      <button
                                          onClick={logout}
                                          className="w-full flex items-center gap-4 text-[#262626] dark:text-gray-300"
                                      >
                                          Logout
                                      </button>
                                  </li>
                              </ul>
                          </div>
                      </Menu.Items>
                  </Transition>
              </Menu>
       </div>
    </div>
  )
}

export default MobileMenu