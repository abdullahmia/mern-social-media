import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { BiMoon } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { userLoggedOut } from "../../../../../features/auth/authSlice"
import { setDarkTheme, setLightTheme } from "../../../../../features/theme/themeSlice"
import ProfilePicture from "../../../custom/images/ProfilePicture"

const ProfileDropDown = () => {
    const {user} = useSelector(state => state.auth);
    const { theme } = useSelector(state => state.theme);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // theme handler
    const themeHandler = () => {
        if (theme === "light") {
            dispatch(setDarkTheme());
        } else {
            dispatch(setLightTheme());
        }
    }

    // logout function
    const logout = () => {
        dispatch(userLoggedOut());
        navigate("/login");
    };

  return (
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
              <Menu.Items className="absolute lg:top-[41px] right-[0px] top-[-218px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-[#262626] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  dark:border-[#2d343b]">
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
                              <button onClick={themeHandler} className="w-full flex items-center gap-4 text-[#262626] dark:text-gray-300">
                                  <BiMoon size={20} />Theme
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
  )
}

export default ProfileDropDown