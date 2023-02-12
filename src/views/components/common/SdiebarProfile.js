import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Image from "./Image";

const SdiebarProfile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <div>
          <Image
            src={user?.image ? user?.image : "social-media/user_wxjx6f"}
            classname="w-[56px] h-[56px] rounded-full object-cover"
          />
        </div>
        <div>
          <Link
            to={`${user?.username}`}
            className="text-[14px] text-[#262626] dark:text-gray-300 font-[600]"
          >
            {user?.username}
          </Link>
          <h2 className="text-[14px] text-[#8e8e8e] dark:text-gray-400">
            {user?.fullName}
          </h2>
        </div>
      </div>
      <div>
        <button className="text-[12px] font-[700] capitalize text-[#0095f6]">
          switch
        </button>
      </div>
    </div>
  );
};

export default SdiebarProfile;
