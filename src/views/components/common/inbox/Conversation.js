import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSeenConversationMutation } from "../../../../features/conversation/conversationApi";
import ProfilePicture from "../../custom/images/ProfilePicture";

const Conversation = ({conversation = {}}) => {
    const { lastMessage, participants, updatedAt, _id} = conversation;
    const {user} = useSelector(state => state.auth);

    const receiver = participants.find(participant => participant._id !== user._id);
    const {fullName, image} = receiver || {};

    const navigate = useNavigate();

    const isSeen = conversation.seen.includes(user._id);

    const [seenConversation] = useSeenConversationMutation();
    const renderMessage = (conversationId) => {
        navigate(`/direct/${conversationId}`);
        seenConversation(conversationId);
    }



  return (
      <div onClick={() => renderMessage(_id)} class={`cursor-pointer flex items-center p-4  relative hover:bg-gray-100 dark:hover:bg-[#24282e] `}>
          <div class="w-10 h-10 relative flex flex-shrink-0">
              <ProfilePicture src={image} class="shadow-md rounded-full w-full h-full object-cover" />
          </div>
          <div class="flex-auto min-w-0 ml-4 mr-6 hidden lg:block">
              <p className="text-[#262626] dark:text-gray-200">{fullName}</p>
              <div class="flex items-center text-sm text-gray-600">
                  <div class="min-w-0">
                      <p class="text-[14px] text-[#262626] dark:text-gray-400">{lastMessage} <span className="ml-auto">. {moment(updatedAt).fromNow()}</span></p>
                  </div>
              </div>
          </div>
          {!isSeen && <div class="w-3 h-3 bg-gray-500 rounded-full"></div>}
      </div>
  )
}

export default Conversation;