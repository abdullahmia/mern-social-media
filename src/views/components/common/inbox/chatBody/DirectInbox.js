import { FaRegPaperPlane } from "react-icons/fa";
import NewChat from "../newChat/NewChat";

const DirectInbox = () => {
  return (
      <section class="flex justify-center items-center flex-auto border-l dark:border-[#2d343b]">
          <div className="text-center space-y-2">
              <FaRegPaperPlane size={50} className="m-auto" />
              <h4 className="text-[24px] text-[#262626] dark:text-gray-200">
                  Your Messages
              </h4>
              <h4 className="text-[14px] text-[#262626] dark:text-gray-400">
                  Send private photos and messages to a friend or group.
              </h4>
              <NewChat />
          </div>

      </section>
  )
}

export default DirectInbox;