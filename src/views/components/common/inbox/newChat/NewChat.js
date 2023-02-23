import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { BiCircle, BiX } from 'react-icons/bi';
import { useGetFollowersQuery } from '../../../../../features/user/userApi';
import Image from '../../Image';
import SendMessage from './SendMessage';

const NewChat = ({isIcon}) => {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [user, setUser] = useState(null);

  // toggole new chat
  const toggleNewChat = () => {
    setIsNewChatOpen(!isNewChatOpen);
  }


  // get user followers
  const { data: followers } = useGetFollowersQuery();


  return (
    <div>
      {
        isIcon ? (<button onClick={toggleNewChat} class="block rounded-full w-10 h-10 p-2">
          <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
            <path
              d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
          </svg>
        </button>) : (<button onClick={toggleNewChat} className="bg-[#0095F6] text-sm py-2 px-5 rounded text-white">Send Message</button>)
      }
      

      <Transition appear show={isNewChatOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsNewChatOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded background dark:border-[#2d343b] text-left align-middle shadow-xl transition-all">
                  <div className='flex justify-between items-center border-b py-2 px-3 text-[#262626] dark:text-gray-100 dark:border-[#2d343b]'>
                    <button onClick={() => setIsNewChatOpen(false)}><BiX size={25} /></button>
                    <h2>New Message</h2>
                  </div>

                  {/* Search User */}
                  <div className='flex items-center gap-3 mt-2 px-3 text-[#262626] dark:text-gray-100'>
                    <p className='text-xl'>To: </p>
                    {user && <div className='flex items-center gap-2'>
                      <div className='w-8 h-8'>
                        <Image src={user.image ? user.image : 'social-media/user_wxjx6f'} classname='w-full h-full rounded-full' alt="" />
                      </div>
                      <p>{user.username}</p>
                      <button onClick={() => setUser(null)}><BiX size={25} /></button>
                    </div>}
                    {!user && <input type="text" placeholder='Search...' className='background flex-1 py-2 focus:outline-none' />}
                  </div>

                  {/* Send Message */}
                  {user && <SendMessage receiver={user} setIsNewChatOpen={setIsNewChatOpen} />}

                  {/* Prfiles */}
                  {
                    !user && <div className='mt-6'>
                      <h1 className='text-[#262626] dark:text-gray-200 px-3'>Suggested</h1>

                      <div className='mt-4 h-[300px] overflow-y-scroll'>
                        {
                          followers && followers.map((follower, key) => (
                            <div key={key} onClick={() => setUser(follower)} className='py-2 px-3 flex items-center gap-3 hover:bg-gray-100 transition cursor-pointer dark:hover:bg-[#202020]'>
                              <div className='w-11 h-11'>
                                <Image src={follower.image ? follower.image : 'social-media/user_wxjx6f'} classname='w-full h-full rounded-full' alt="" />
                              </div>
                              <div className='flex flex-1 justify-between items-center text-[#262626] dark:text-gray-100'>
                                <div>
                                  <h2>{follower.fullName}</h2>
                                </div>
                                <div>
                                  <button onClick={() => setUser('32afdasdfasdf')}><BiCircle size={25} /></button>
                                </div>
                              </div>
                            </div>
                          ))
                        }

                        

                      </div>
                    </div>
                  }
                  
                  
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

    </div>
  )
}

export default NewChat;
