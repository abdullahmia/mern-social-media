import Header from "../../components/common/Header"
import ChatBody from "../../components/common/inbox/chatBody/ChatBody"
import Sidebar from "../../components/common/inbox/Sidebar"
import Wrapper from "../../components/custom/Wrapper"

const Direct = () => {
  return (
      <Wrapper title="Inbox">
          <div className="dark:bg-[#121212]">
              <div class="h-screen w-full flex overflow-hidden ">
                  <div class="border flex-1 flex flex-col dark:border-[#2d343b]">
                      <Header />
                      <main class="container my-6 flex-grow flex flex-row min-h-0 border dark:border-[#2d343b]">
                          <Sidebar />
                          <ChatBody />
                      </main>
                  </div>
              </div>

          </div>
      </Wrapper>
  )
}

export default Direct


