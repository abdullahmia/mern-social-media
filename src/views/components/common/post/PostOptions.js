import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const PostOptions = ({postId, username}) => {
    let [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_URL}/p/${postId}`);
        toast.success('Link copied to clipboard');
        closeModal();
    }

    const redirectToPostHandler = () => {
        navigate(`/p/${postId}`);
        closeModal();
    }

    const redirectProfileHandler = () => {
        navigate(`/${username}`);
        closeModal();
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                
            >
                <AiOutlineEllipsis className="dark:text-gray-100" />
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-[#262626]">
                                    <div className='w-full text-center divide-y  text-[#262626] dark:divide-[#2d343b] dark:text-gray-100'>
                                        <div className='py-3 text-[14px] text-red-500'>Report</div>
                                        <div className='py-3 text-[14px] text-red-500'>Unfollow</div>
                                        <div className='py-3 text-[14px]'>Add to favourite</div>
                                        <button onClick={redirectToPostHandler} className='w-full py-3 text-[14px]'>Go to post</button>
                                        <div className='py-3 text-[14px]'>Share to</div>
                                        <button onClick={copyLinkHandler} className='w-full py-3 text-[14px]'>Copy link</button>
                                        <div className='py-3 text-[14px]'>Embed</div>
                                        <button onClick={redirectProfileHandler} className='w-full py-3 text-[14px]'>About this account</button>
                                        <button onClick={closeModal} className='w-full py-3 text-[14px]'>Cancel</button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default PostOptions