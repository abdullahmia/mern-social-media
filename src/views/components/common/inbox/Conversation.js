import { Link } from "react-router-dom";

const Conversation = () => {
  return (
      <Link to="/inbox" class="flex justify-between items-center p-4  relative hover:bg-gray-100 dark:hover:bg-[#24282e]">
          <div class="w-10 h-10 relative flex flex-shrink-0">
              <img class="shadow-md rounded-full w-full h-full object-cover"
                  src="https://randomuser.me/api/portraits/women/61.jpg"
                  alt=""
              />
          </div>
          <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
              <p className="text-[#262626] dark:text-gray-200">Abir Islam</p>
              <div class="flex items-center text-sm text-gray-600">
                  <div class="min-w-0">
                      <p class="text-[14px] text-[#262626] dark:text-gray-400">Ok, see you at the subway in a bit. <span>2h</span></p>
                  </div>
              </div>
          </div>
      </Link>
  )
}

export default Conversation;