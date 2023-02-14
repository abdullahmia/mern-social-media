import { Link } from "react-router-dom";
import Conversation from "./Conversation";

const Sidebar = () => {
  return (
      <section class="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
          <div class="header p-4 flex flex-row justify-between items-center flex-none border-b dark:border-[#2d343b]">
              <p class="text-md font-bold hidden md:block group-hover:block text-[#262626] dark:text-gray-100">Messenger</p>
              <Link to="inbox" class="block rounded-full w-10 h-10 p-2">
                  <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
                      <path
                          d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
                  </svg>
              </Link>
          </div>

          <div class="contacts flex-1 overflow-y-scroll">
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
              <Conversation />
          </div>
      </section>
  )
}

export default Sidebar;