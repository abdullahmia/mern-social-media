import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfilePicture from "../../custom/images/ProfilePicture";

const Conversation = ({conversation = {}}) => {
    const { lastMessage, participants, updatedAt, _id} = conversation;
    const {user} = useSelector(state => state.auth);

    const receiver = participants.find(participant => participant._id !== user._id);
    const {fullName, image} = receiver || {};


  return (
      <Link to={`/direct/${_id}`} class="flex justify-between items-center p-4  relative hover:bg-gray-100 dark:hover:bg-[#24282e]">
          <div class="w-10 h-10 relative flex flex-shrink-0">
              <ProfilePicture src={image} class="shadow-md rounded-full w-full h-full object-cover" />
          </div>
          <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
              <p className="text-[#262626] dark:text-gray-200">{fullName}</p>
              <div class="flex items-center text-sm text-gray-600">
                  <div class="min-w-0">
                      <p class="text-[14px] text-[#262626] dark:text-gray-400">{lastMessage} <span className="ml-auto">. {moment(updatedAt).fromNow()}</span></p>
                  </div>
              </div>
          </div>
      </Link>
  )
}

export default Conversation;