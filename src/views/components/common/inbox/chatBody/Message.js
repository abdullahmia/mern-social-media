import { useSelector } from "react-redux";
import ProfilePicture from '../../../custom/images/ProfilePicture';

const Message = ({ message = {} }) => {
    const {sender, receiver, text} = message;
    const {user} = useSelector(state => state.auth);
    
  return (
      <div class={`my-1 flex flex-row ${receiver?._id === user._id ? 'justify-start' : "justify-end"}`}>
          {sender?._id !== user._id && <div class="w-5 h-5 relative flex flex-shrink-0 mr-4">
              <ProfilePicture src={sender?.image} class="shadow-md rounded-full w-full h-full object-cover" />
          </div>}
          <div class={`messages text-sm text-gray-700 grid grid-flow-row gap-2`}>
              <div class="flex items-center">
                  <p class={`px-6 py-3 border rounded-full max-w-xs lg:max-w-md  ${sender?._id === user._id && 'bg-gray-100 dark:bg-[#262626]'} dark:border-[#2d343b] dark:text-gray-300`}>{text}</p>
              </div>
          </div>
      </div>
  )
}

export default Message;