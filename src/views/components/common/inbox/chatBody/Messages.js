import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../../../features/message/messageApi";
import useChatScroll from '../../../../../hooks/useChatScroll';
import MessagesLoader from "../../loaders/MessagesLoader";
import Message from "./Message";

const Messages = () => {
  const { conversationId } = useParams();

  const { data: messages, isLoading } = useGetMessagesQuery(conversationId);

  const ref = useChatScroll(messages)
  
  // decide what to render
  const renderMessages = () => {
    if (isLoading) return <MessagesLoader />;
    if (messages.length === 0) return 'No messages yet';

    return messages.map((message, key) => (
      // if the message is from the current user, render the sender message
        <Message message={message} key={key} />
      ))
  }



  return (
    <div ref={ref} class="chat-body p-4 flex-1 flex flex-col overflow-y-scroll no-scrollbar">
      {
        renderMessages()
      }
    </div>
  )
}

export default Messages;