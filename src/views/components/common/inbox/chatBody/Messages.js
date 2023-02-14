import Message from "./Message";

const Messages = () => {
  return (
      <div class="chat-body p-4 flex-1 overflow-y-scroll">
          <Message sender />
          <Message />
          <Message sender />
          <Message />
          <Message sender />
      </div>
  )
}

export default Messages;