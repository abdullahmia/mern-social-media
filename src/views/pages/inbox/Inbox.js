import Sidebar from "../../components/common/inbox/Sidebar";
import Wrapper from "../../components/custom/Wrapper";

const Inbox = () => {
  return (
    <Wrapper title="Inbox">
       <div className="container">
              <div class="h-screen w-full flex border overflow-hidden dark:bg-[#252a30] dark:border-[#2d343b]">
                  <div class="flex-1 flex flex-col">
                      <main class="flex-grow flex flex-row min-h-0">
                          

                            <Sidebar />

                          
                      </main>
                  </div>
              </div>

       </div>
    </Wrapper>
  )
}

export default Inbox;