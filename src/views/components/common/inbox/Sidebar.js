import { useGetConversationsQuery } from "../../../../features/conversation/conversationApi";
import ConversationsLoader from "../loaders/ConversationsLoader";
import Conversation from "./Conversation";
import NewChat from "./newChat/NewChat";

const Sidebar = () => {

    const { data: conversations, isLoading, isError } = useGetConversationsQuery();

    // decide what to render
    const renderConversations = () => {
        if (isLoading) {
            return <ConversationsLoader />
        } else if (isError) {
            return <p className="text-center py-4 text-[#262626] dark:text-gray-100">Something went wrong!</p>
        } else if (conversations.length === 0) {
            return <p className="text-center py-4 text-[#262626] dark:text-gray-100">No conversations</p>
        } else {
            return conversations && conversations.map((conversation, key) => (
                <Conversation key={key} conversation={conversation} />
            ))
        }
    }

  return (
      <section class="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
          <div class="header p-4 flex flex-row justify-between items-center flex-none border-b dark:border-[#2d343b]">
              <p class="text-md font-bold hidden md:block group-hover:block text-[#262626] dark:text-gray-100">abirislam</p>
              <NewChat isIcon />
          </div>

          <div class="contacts flex-1 overflow-y-scroll">

            {
                renderConversations()
            }
            
          </div>
      </section>
  )
}

export default Sidebar;