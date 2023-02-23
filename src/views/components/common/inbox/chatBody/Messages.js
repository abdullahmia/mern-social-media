import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../../../features/message/messageApi";
import Message from "./Message";

const Messages = () => {
  const { conversationId } = useParams();

  const { data: messages, isLoading } = useGetMessagesQuery(conversationId);
  
  // decide what to render
  const renderMessages = () => {
    if (isLoading) return 'Loading...';
    if (messages.length === 0) return 'No messages yet';

    return messages.map((message, key) => (
      // if the message is from the current user, render the sender message
        <Message message={message} key={key} />
      ))
  }



  return (
    <div class="chat-body p-4 flex-1 flex flex-col overflow-y-scroll">
      {
        renderMessages()
      }
      </div>
  )
}

export default Messages;