import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLoggedOut } from '../../../../features/auth/authSlice';
import { useUnfollowMutation } from '../../../../features/user/userApi';

const ProfileOptions = ({ profile }) => {
    let [isOpen, setIsOpen] = useState(false);

    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_URL}/${profile.username}`);
        toast.success('Link copied to clipboard');
        closeModal();
    }

    // // unfollow
    const [unfollow] = useUnfollowMutation();
    const unFollowHandler = async () => {
        await unfollow(profile._id);
        closeModal();
    };

    const logoutHandler = () => {
        dispatch(userLoggedOut());
        closeModal();
        navigate('/login')
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}

            >
                <svg
                    aria-label="Options"
                    className='dark:text-gray-200'
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                >
                    <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="8.635"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    ></circle>
                    <path
                        d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                        fill="none"
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                    ></path>
                </svg>
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
                                    {
                                        user._id === profile._id && <div className='w-full text-center divide-y  text-[#262626] dark:divide-[#2d343b] dark:text-gray-100'>
                                            <div className='py-3 text-[14px]'>
                                                <Link to='/account/password' className='block'>Change password</Link>
                                            </div>
                                            <div className='py-3 text-[14px]'>QR Code</div>
                                            <div className='py-3 text-[14px]'>Apps and Website</div>
                                            <div className='py-3 text-[14px]'>Notifications</div>
                                            <div className='py-3 text-[14px]'>Privacy and Security</div>
                                            <div className='py-3 text-[14px]'>Supervision</div>
                                            <div className='py-3 text-[14px]'>Login activity</div>
                                            <div className='py-3 text-[14px]'>Emails and Instagram</div>
                                            <div className='py-3 text-[14px]'>Report a problem</div>
                                            <div onClick={logoutHandler} className='py-3 text-[14px] cursor-pointer'>Log Out</div>
                                            <button onClick={closeModal} className='w-full py-3 text-[14px]'>Cancel</button>
                                        </div>
                                    }
                                    {
                                        user._id !== profile._id && <div className='w-full text-center divide-y  text-[#262626] dark:divide-[#2d343b] dark:text-gray-100'>
                                            <div className='py-3 text-[14px] text-red-500'>Block</div>
                                            <div onClick={unFollowHandler} className='cursor-pointer py-3 text-[14px] text-red-500'>Unfollow</div>
                                            <div className='py-3 text-[14px]'>Report</div>
                                            <button onClick={copyLinkHandler} className='w-full py-3 text-[14px]'>Share account</button>
                                            <button onClick={closeModal} className='w-full py-3 text-[14px]'>Cancel</button>
                                        </div>
                                    }
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ProfileOptions