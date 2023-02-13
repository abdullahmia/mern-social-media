import moment from "moment";
import { Link } from "react-router-dom";
import Image from "../Image";

const Notification = ({notification}) => {
    const { sender, link, createdAt } = notification || {};
    const {username, image} = sender || {};
  return (
      <Link to={link} className="p-3 flex gap-3 hover:bg-gray-100 dark:hover:bg-gray-600">
          <div>
              <Image src={image ? image : 'social-media/user_wxjx6f'} classname="w-8 h-8 rounded-full border" />
          </div>
          <div className="flex-1">
              <Link to="/" className="text-sm py-2 dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300"><b>{username}</b> started following you. <span>{moment(createdAt).fromNow()}</span> </Link>
          </div>
      </Link>
  )
}

export default Notification