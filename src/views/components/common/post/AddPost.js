import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import { toast } from 'react-hot-toast';
import { BiCloudUpload, BiX } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useAddPostMutation } from '../../../../features/post/postApi';
import ProfilePicture from '../../custom/images/ProfilePicture';
import Loader from '../loaders/Loader';

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

const AddPost = () => {
    let [isOpen, setIsOpen] = useState(false);
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState(null);

    const {user} = useSelector(state => state.auth);

    const handleChange = (file) => {
        setFile(file);
    };

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    const [addPost, { isLoading, data, isSuccess, isError }] = useAddPostMutation();
    const addNewPost = async (e) => {
        e.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append("caption", caption);
            formData.append("image", file);

            await addPost(formData);
        } else {
            return;
        }
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message);
            setFile(null);
            setCaption('');
            closeModal();
        }
        if (isError) {
            toast.error('Something went wrong! Please try again later.');
        }
    }, [isSuccess, data, isError]);

  return (
      <>
        <button onClick={openModal}>
            <svg
                aria-label="New post"
                className="dark:text-gray-200"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
            >
                <path
                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                ></path>
                <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="6.545"
                    x2="17.455"
                    y1="12.001"
                    y2="12.001"
                ></line>
                <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="12.003"
                    x2="12.003"
                    y1="6.545"
                    y2="17.455"
                ></line>
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
                              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded bg-white text-left align-middle shadow-xl transition-all text-[#262626] dark:text-gray-100 dark:bg-[#262626]">
                                <div className='text-center py-3 border-b  dark:border-[#2d343b]'>
                                    <h2>Add Post</h2>
                                </div>

                                <div className='p-4'>
                                    <div className='flex items-center gap-4'>
                                        <ProfilePicture src={user?.image} className="w-[35px] h-[35px] rounded-full" />
                                        <h2>{user?.fullName}</h2>
                                    </div>
                                    <form onSubmit={addNewPost} className='mt-6' id='postForm'>
                                        <div className='w-full flex'>
                                            <input type="text" value={caption} onChange={e => setCaption(e.target.value)} className='flex-1 w-full pb-16 mb-3 bg-transparent focus:outline-none' placeholder="What's on your mind?" />
                                            {/* <EmojiPicker text={caption} setText={setCaption} /> */}
                                        </div>

                                          {file && <div className='w-full h-60 rounded relative mb-5'>
                                              <img src={URL.createObjectURL(file)} className="w-full h-full object-contain" alt="Post" />
                                              <button onClick={() => setFile(null)} className='absolute top-0 bg-gray-300 p-1 rounded-full'>
                                                  <BiX size={20} />
                                              </button>
                                          </div>}

                                          {!file && <div className='mb-4'>
                                              <FileUploader
                                                  multiple={false}
                                                  handleChange={handleChange}
                                                  name="file"
                                                  types={fileTypes}
                                              >
                                                  <div className='text-center border py-12 rounded  dark:border-[#2d343b]'>
                                                      <BiCloudUpload size={50} className="m-auto" />
                                                      <h2>Add photos/videos</h2>
                                                      <p>or drag & drop!</p>
                                                  </div>
                                              </FileUploader>
                                          </div>
}
                                        
                                        <button type='submit' className='bg-[#0095F6] text-center text-gray-100 w-full flex justify-center items-center rounded py-2'>
                                            {isLoading ? <Loader /> : 'Post'}
                                        </button>

                                    </form>
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

export default AddPost