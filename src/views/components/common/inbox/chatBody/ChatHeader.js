import { Link } from "react-router-dom";
import ProfilePicture from "../../../custom/images/ProfilePicture";

const ChatHeader = ({receiver}) => {
    
    const {fullName, image} = receiver || {};
  return (
      <div class="chat-header px-6 py-3 flex flex-row flex-none justify-between items-center shadow">
          <div class="flex">
              <div class="w-10 h-10 mr-4 relative flex flex-shrink-0">
                  <ProfilePicture src={image} class="shadow-md rounded-full w-full h-full object-cover" />
              </div>
              <div class="text-sm">
                  <p class="font-bold text-[#262626] dark:text-gray-200">{fullName}</p>
                  {/* <p className="text-[#262626] dark:text-gray-400">Active 1h ago</p> */}
              </div>
          </div>

          <div class="flex justify-end">
              <Link to="/inbox" class="block rounded-full w-8 h-8 p-2">
                  <svg aria-label="Audio call" class="w-full h-full" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path></svg>
              </Link>
              <Link to="/inbox" class="block rounded-fullw-8 h-8 p-2">
                  <svg aria-label="Video call" class="w-full h-full" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><rect fill="none" height="18" rx="3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="16.999" x="1" y="3"></rect><path d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
              </Link>
              <Link to="/inbox" class="block rounded-fullw-8 h-8 p-2">
                  <svg aria-label="View Thread Details" class="w-full h-full" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle><circle cx="11.819" cy="7.709" r="1.25"></circle><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10.569" x2="13.432" y1="16.777" y2="16.777"></line><polyline fill="none" points="10.569 11.05 12 11.05 12 16.777" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline></svg>

              </Link>
          </div>
      </div>
  )
}

export default ChatHeader;