import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAddConversationMutation } from "../../../../../features/conversation/conversationApi";

const SendMessage = ({ receiver = {}, setIsNewChatOpen }) => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // add conversation handler
  const [addConversation, { isLoading, isSuccess, isError, data: conversation }] = useAddConversationMutation();
  const addConversationHandler = (e) => {
    e.preventDefault();
    if (!message) return toast.error('Message is required');
    addConversation({ receiverId: receiver._id, message})
  }

  useEffect(() => {
    if (isSuccess) {
      setMessage('');
      setIsNewChatOpen(false);
      navigate(`/direct/${conversation._id}`);
      toast.success('Message sent successfully');
    }
    if (isError) {
      toast.error('Something went wrong');
    }
  }, [isSuccess, isError, setIsNewChatOpen, conversation, navigate])


  return (
    <form onSubmit={addConversationHandler} className="px-3 py-5 flex gap-3">
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message.." className="background flex-1 border-b focus:outline-none  dark:border-[#2d343b] dark:text-gray-200" />
        <button type="submit" className="bg-[#0095F6] text-sm p-2 rounded text-white">
          {isLoading ? 'Sending...' : <BiSend size={25} /> }
        </button>
    </form>
  )
}

export default SendMessage;