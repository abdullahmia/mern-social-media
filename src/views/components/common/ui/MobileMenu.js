import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../../features/auth/authSlice";
import { useGetConversationsQuery } from "../../../../features/conversation/conversationApi";
import Notifications from "../notification/Notifications";
import AddPost from "../post/AddPost";
import ProfileDropDown from "./header/ProfileDropDown";

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
              
              <ProfileDropDown />
       </div>
    </div>
  )
}

export default MobileMenu