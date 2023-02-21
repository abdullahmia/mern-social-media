import Conversation from "./Conversation";
import NewChat from "./newChat/NewChat";

const Sidebar = () => {
  return (
      <section class="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
          <div class="header p-4 flex flex-row justify-between items-center flex-none border-b dark:border-[#2d343b]">
              <p class="text-md font-bold hidden md:block group-hover:block text-[#262626] dark:text-gray-100">abirislam</p>
              <NewChat isIcon />
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