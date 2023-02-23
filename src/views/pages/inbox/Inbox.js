import { useParams } from "react-router-dom";
import ChatBody from "../../components/common/inbox/chatBody/ChatBody";
import InboxWrapper from "../../components/common/inbox/InboxWrapper";

const Inbox = () => {
  const { conversationId } = useParams();
  return (
    <InboxWrapper>
      <ChatBody conversationId={conversationId} />
    </InboxWrapper>
  )
}

export default Inbox;