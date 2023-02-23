const ConversationsLoader = () => {
  return (
    <div>
          {
            Array(10).fill().map((_, i) => (
                <div class="flex justify-between items-center p-4  relative hover:bg-gray-100 dark:hover:bg-[#24282e]">
                    <div class="w-10 h-10 relative flex flex-shrink-0">
                        <div class="bg-gray-200 shadow-md rounded-full w-full h-full animate-pulse dark:bg-gray-600" />
                    </div>
                    <div class="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                        <p className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-600"></p>
                        <p className="h-2 mt-3 w-[80%] rounded bg-gray-200 animate-pulse dark:bg-gray-600"></p>
                    </div>
                </div>
            ))
          }
    </div>
  )
}

export default ConversationsLoader;