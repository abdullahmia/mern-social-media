import moment from "moment";
import Image from "../Image";

const Comment = ({ comment = {} }) => {


  return (
    <div className="flex gap-3 items-start py-2">
      <Image src={comment.user.image} classname="w-[32px] h-[32px] rounded-full" />
      
      <div>
        <h2 className="text-[14px] text-[#262626] font-[600] dark:text-gray-300">
          {comment.user.username}{" "}
          <span className="font-[400] ml-3 dark:text-gray-400">
            {comment.comment}
          </span>
        </h2>
        <p className="text-[12px] text-[#8e8e8e]">{moment(comment.createdAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default Comment;
