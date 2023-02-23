import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetConversationsQuery } from "../../../../../features/conversation/conversationApi";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import Options from "./Options";

const ChatBody = () => {
  const { conversationId } = useParams();
  const { data: conversations } = useGetConversationsQuery();
  const conversation = conversations?.find(conversation => conversation._id === conversationId);
  const { participants } = conversation || {};
  const { user } = useSelector(state => state.auth);
  const receiver = participants?.find(participant => participant._id !== user._id);

  return (
      <section class="flex flex-col flex-auto border-l dark:border-[#2d343b]">
        <ChatHeader receiver={receiver} />

        {/* Message */}
        <Messages />

        {/* Chat Options */}
        <Options conversationId={conversationId} receiver={receiver} />

      </section>
  )
}

export default ChatBody