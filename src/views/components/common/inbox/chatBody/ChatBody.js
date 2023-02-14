import ChatHeader from "./ChatHeader"
import Messages from "./Messages"
import Options from "./Options"

const ChatBody = () => {
  return (
      <section class="flex flex-col flex-auto border-l dark:border-[#2d343b]">

        <ChatHeader />

        


        {/* Message */}
        <Messages />
          

        {/* Chat Options */}
        <Options />

      </section>
  )
}

export default ChatBody