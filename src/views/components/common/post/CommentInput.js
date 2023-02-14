import { Popover } from "@headlessui/react";
import { Picker } from "emoji-mart";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useAddCommentMutation } from "../../../../features/comment/commentApi";
import Loader from "../loaders/Loader";

const CommentInput = ({post}) => {
  const [commentText, setCommentText] = useState("");

  // for adding emojis
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentText(commentText + emoji);
  };
  
  // add comment handler
  const [addComment, {isLoading, isSuccess, isError, data}] = useAddCommentMutation();
  const addCommentHandler = (e) => {
    e.preventDefault();
    if (!commentText) return;
    addComment({ post, comment: commentText });
  }

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong!');
    }
    if (isSuccess) {
      setCommentText("");
      console.log(data);
    }
  }, [isError, isSuccess, data])

  return (
    <div className="">
      <form onSubmit={addCommentHandler} className="flex items-center gap-2">
        <div className="">
          <Popover className="mt-1 relative">
            <Popover.Button className="relative focus:outline-none">
              <svg
                aria-label="Emoji"
                className="_ab6-"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
              </svg>
            </Popover.Button>

            <Popover.Panel className="absolute top-[-379px] left-[-14px] z-10 w-full">
              <Picker
                onSelect={addEmoji}
                theme="dark"
              />
            </Popover.Panel>
          </Popover>
        </div>
        <div className="flex items-center flex-1">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            className="py-3 text-[14px] text-[#8e8e8e] font-[400] border-none focus:outline-none  bg-transparent"
          />
          <button className="ml-auto capitalize text-[14px] text-[#0095f6] font-[700]">
            {isLoading ? <Loader /> : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CommentInput