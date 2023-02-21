import { BiSend } from "react-icons/bi";

const SendMessage = () => {
  return (
    <form className="px-3 py-5 flex gap-3">
          <input type="text" placeholder="Message.." className="background flex-1 border-b focus:outline-none  dark:border-[#2d343b] dark:text-gray-200" />
        <button type="submit" className="bg-[#0095F6] text-sm p-2 rounded text-white"><BiSend size={20} /></button>
    </form>
  )
}

export default SendMessage;