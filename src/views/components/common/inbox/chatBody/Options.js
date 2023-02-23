import { Popover, Transition } from "@headlessui/react";
import { Picker } from "emoji-mart";
import { Fragment, useState } from "react";
import { BiHeart, BiImageAlt } from "react-icons/bi";
import { BsEmojiSmile } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useSendMessageMutation } from "../../../../../features/message/messageApi";

const Options = ({ conversationId, receiver }) => {
    const [message, setMessage] = useState("");

    // for adding emojis
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMessage(message + emoji);
    };

    const {user} = useSelector(state => state.auth);

    // for send message handler
    const [sendMessage] = useSendMessageMutation();

    const sendMessageHandler = (e) => {
        e.preventDefault();

        const messageData = {
            sender: user._id,
            receiver: receiver._id,
            text: message,
        };

        sendMessage({conversationId, body: messageData});

        setMessage('');
    }

  return (
      <div class="chat-footer flex-none mb-5">
          <form onSubmit={sendMessageHandler} class="flex flex-row items-center gap-3 border mx-3 px-4 py-1 rounded-full dark:border-[#2d343b]">
              <div className="">
                  <Popover className="mt-1 relative">
                      <Popover.Button className="relative focus:outline-none dark:text-gray-300">
                          <BsEmojiSmile size={26} />
                      </Popover.Button>

                      <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                      >
                          <Popover.Panel className="absolute top-[-367px] left-[7px] z-10 w-full">
                              <Picker
                                  onSelect={addEmoji}
                                  theme="dark"
                              />
                          </Popover.Panel>
                      </Transition>
                  </Popover>
              </div>
              <div className="flex items-center flex-1">
                  <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Message..."
                      className="w-full py-2 text-[14px] text-[#8e8e8e] font-[400] border-none focus:outline-none  bg-transparent"
                  />
                  <div className="ml-auto flex items-center gap-2">
                      <button type="button" className="dark:text-gray-300">
                          <BiImageAlt size={27} />
                      </button>
                      <button className="dark:text-gray-300">
                          <BiHeart size={27} />
                      </button>
                  </div>
              </div>
          </form>
      </div>
  )
}

export default Options;