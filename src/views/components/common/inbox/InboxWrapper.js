import Wrapper from "../../custom/Wrapper";
import Header from "../ui/Header";
import Sidebar from './Sidebar';

const InboxWrapper = ({children}) => {
  return (
      <Wrapper title={"Inbox • Instagram"}>
          <div className="dark:bg-[#121212]">
              <div class="h-screen w-full flex overflow-hidden ">
                  <div class="border flex-1 flex flex-col dark:border-[#2d343b]">
                      <Header />
                      <main class="container my-6 flex-grow flex flex-row min-h-0 border dark:border-[#2d343b]">
                          <Sidebar />
                          {children}
                      </main>
                  </div>
              </div>

          </div>
      </Wrapper>
  )
}

export default InboxWrapper;