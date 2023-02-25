import moment from "moment";
import { Link } from "react-router-dom";
import ProfilePicture from "../../custom/images/ProfilePicture";

const Notification = ({notification}) => {
    const { sender, link, createdAt, type } = notification || {};
    const {username, image} = sender || {};
  return (
      <Link to={link} className="p-3 flex gap-3 hover:bg-gray-100 dark:hover:bg-gray-600">
          <div>
              <ProfilePicture src={image} className="w-8 h-8 rounded-full border" />
          </div>
          <div className="flex-1">
            {
                type === 'comment' && <div className="text-sm py-2 dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300"><b>{username}</b> commented on your post. <span>{moment(createdAt).fromNow()}</span> </div>
            }
            {
                type === 'like' && <div className="text-sm py-2 dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300"><b>{username}</b> liked your post. <span>{moment(createdAt).fromNow()}</span> </div>
            }
            {
                type === 'follow' && <div className="text-sm py-2 dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300"><b>{username}</b> started following you. <span>{moment(createdAt).fromNow()}</span> </div>
            }
              
          </div>
      </Link>
  )
}

export default Notification