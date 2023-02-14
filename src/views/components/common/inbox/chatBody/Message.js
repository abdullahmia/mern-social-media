const Message = ({ sender }) => {
  return (
      <div class={`my-1 flex flex-row ${sender ? 'justify-start' : 'justify-end'}`}>
          {sender && <div class="w-5 h-5 relative flex flex-shrink-0 mr-4">
              <img class="shadow-md rounded-full w-full h-full object-cover"
                  src="https://randomuser.me/api/portraits/women/33.jpg"
                  alt=""
              />
          </div>}
          <div class={`messages text-sm text-gray-700 grid grid-flow-row gap-2`}>
              <div class="flex items-center">
                  <p class={`px-6 py-3 border rounded-full max-w-xs lg:max-w-md  ${!sender && 'bg-gray-100 dark:bg-gray-600'} dark:border-[#2d343b] dark:text-gray-300`}>Hey! How are you?</p>
              </div>
          </div>
      </div>
  )
}

export default Message;