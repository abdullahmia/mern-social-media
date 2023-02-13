import { Popover } from "@headlessui/react";
import { Picker } from "emoji-mart";
import { useState } from "react";

const CommentInput = () => {
    const [commentText, setCommentText] = useState("");

  // for adding emojis
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setCommentText(commentText + emoji);
  };
    
    console.log(commentText);

  return (
    <div className="px-3 w-full flex items-center justify-between border-t dark:border-[#2d343b] py-3 mt-3">
        <div className="flex items-center gap-3">

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

                  <Popover.Panel className="absolute top-[-379px] left-[-14px] z-10 mt-2 w-full">
                    <Picker
                      onSelect={addEmoji}
                      style={{
                        // position: "absolute",
                        //   marginTop: "400px",
                        // marginLeft: -40,
                        // maxWidth: "400px",
                        // borderRadius: "20px",
                      }}
                      theme="dark"
                    />
                  </Popover.Panel>
              </Popover>
              
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment"
            className="text-[14px] text-[#8e8e8e] font-[400] border-none focus:outline-none lg:w-[380px] w-[330px] bg-transparent"
          />
        </div>
        <div>
          <button className="capitalize text-[14px] text-[#0095f6] font-[700]">
            post
          </button>
        </div>
      </div>
  )
}

export default CommentInput