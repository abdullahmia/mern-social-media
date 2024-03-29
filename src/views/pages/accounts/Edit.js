import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
// prettier-ignore
import { useSelector } from "react-redux";
import { useIsExitUserQuery } from "../../../features/auth/authApi";
import { useUpdateProfileMutation, useUpdateProfilePictureMutation, useUserDataQuery } from "../../../features/user/userApi";
import Loader from "../../components/common/loaders/Loader";
import AccountWrapper from "../../components/custom/AccountWrapper";
import ProfilePicture from "../../components/custom/images/ProfilePicture";

const Edit = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const filePickerRef = useRef(null);
  const [usernameTerm, setUsernameTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);

  const { register, handleSubmit } = useForm();


  // debounce username
  useEffect(() => {
    setUsernameError("");
    const debounceTimer = setTimeout(() => {
      setDebouncedTerm(usernameTerm);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [usernameTerm]);

  // check username is exist
  const { data: isExitUser, isLoading: isExitUserLoading } = useIsExitUserQuery(debouncedTerm);
  useEffect(() => {
    if (isExitUser) {
      const { isUser } = isExitUser;
      if (isUser) {
        setUsernameError("Username already taken");
        setIsSubmitAvailable(true);
      } else {
        setUsernameError("")
        setIsSubmitAvailable(false);
      }
    }

  }, [isExitUser, isExitUserLoading]);


  const { image, username } = useSelector(state => state.auth.user);
  const { data, isLoading } = useUserDataQuery(username);

  let user = data?.user;
  // update profile
  const [
    updateProfile,
    {
      isLoading: updaeProfileLoading,
      isSuccess,
      isError,
      data: updateProfileResponse,
    },
  ] = useUpdateProfileMutation();

  // update profile submit handler
  const updateProfileHandler = async (data) => {
    await updateProfile(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.custom((t) => (
        <div className="dark:bg-gray-700 bg-white dark:text-gray-300 mb-4 p-4 rounded-md shadow-md flex flex-col gap-9">
          <h2>{updateProfileResponse.message}</h2>
        </div>
      ));
    }

    if (isError) {
      toast.custom((t) => (
        <div className="dark:bg-gray-700 bg-white dark:text-gray-300 mb-4 p-4 rounded-md shadow-md flex flex-col gap-9">
          <h2>Something went wrong!</h2>
        </div>
      ));
    }
  }, [isSuccess, isError, updateProfileResponse]);

  // add photo to image
  const addPhotoToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setProfile(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const [updateProfilePicture, { isLoading: upPicLoading, isSuccess: upPicSuccess }] =
    useUpdateProfilePictureMutation();

  // upload profile picture handler
  const uploadProfilePictureHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", profile);
    await updateProfilePicture(formData);
  };

  useEffect(() => {
    if (upPicSuccess) {
      setSelectedFile(null);
      toast.custom((t) => (
        <div className="dark:bg-gray-700 bg-white dark:text-gray-300 mb-4 p-4 rounded-md shadow-md flex flex-col gap-9">
          <h2>Profile Picture has been updated!</h2>
        </div>
      ));
    }
  }, [upPicSuccess])

  return (
    <AccountWrapper title={"Edit profile • Instagram"}>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="py-8 px-6">
          <div className="w-full">
            <div className="mb-5">
              <form
                onSubmit={uploadProfilePictureHandler}
                className="flex items-center gap-11"
              >
                <div className="lg:w-36 flex justify-end">
                  {selectedFile ? (
                    <img
                      src={selectedFile}
                      className="w-[38px] h-[38px] rounded-full object-cover"
                      alt="profile"
                    />
                  ) : (
                    <ProfilePicture src={image} className="w-[38px] h-[38px] rounded-full object-cover" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-[#262626] text-[20px] font-[400] dark:text-gray-300">
                    {user?.username}
                  </h2>
                  <input
                    type="file"
                    hidden
                    onChange={addPhotoToPost}
                    ref={filePickerRef}
                  />
                  {selectedFile ? (
                    <button
                      type="submit"
                      className="flex items-center gap-2 text-[14px] bg-[#0095f6] font-[600] text-white py-1 px-3 rounded"
                    >
                      {upPicLoading && <Loader />}
                      Upload
                    </button>
                  ) : (
                    <button
                      className="text-[14px] text-[#0095f6] font-[600]"
                      onClick={(e) => {
                        e.preventDefault();
                        filePickerRef.current.click();
                      }}
                    >
                      Change profile photo
                    </button>
                  )}
                </div>
              </form>
            </div>
            <form
              onSubmit={handleSubmit(updateProfileHandler)}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Name
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <input
                    type="text"
                    defaultValue={user?.fullName}
                    {...register("fullName")}
                    className="border px-2 py-1 focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                  <p className="text-[12px] text-[#8e8e8e] font-[400]">
                    Help people discover your account by using the name you're
                    known by: either your full name, nickname, or business name.
                  </p>
                  <p className="text-[12px] text-[#8e8e8e] font-[400]">
                    You can only change your name twice within 14 days.
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Username
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                    {usernameError && <p className="text-xs text-red-500">{usernameError}</p>}
                  
                  <input
                    type="text"
                    defaultValue={user?.username}
                    {...register("username")}
                    onChange={e => setUsernameTerm(e.target.value)}
                    className="border px-2 py-1 focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                  <p className="text-[12px] text-[#8e8e8e] font-[400]">
                    In most cases, you'll be able to change your username back
                    to abirislam1971 for another 14 days.{" "}
                    <span className="hover:underline text-[#0095f6] cursor-pointer">
                      Learn more
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Website
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <input
                    type="text"
                    defaultValue={user?.website ? user?.website : ""}
                    {...register("website")}
                    className="border px-2 py-1 focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Bio
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <textarea
                    type="text"
                    defaultValue={user?.bio ? user?.bio : ""}
                    {...register("bio")}
                    className="border px-2 py-1 focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600]"></label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <h2 className="text-[#8e8e8e] text-[14px] font-[600]">
                    Personal information
                  </h2>
                  <p className="text-[12px] text-[#8e8e8e]">
                    Provide your personal information, even if the account is
                    used for a business, a pet or something else. This won't be
                    a part of your public profile.
                  </p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Email
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="border px-2 py-1 focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Phone number
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <input
                    type="text"
                    defaultValue={user?.phone ? user?.phone : ""}
                    {...register("phone")}
                    className="border px-2 py-1 focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Gender
                  </label>
                </div>
                <div className="flex flex-col w-[335px] gap-2">
                  <select
                    {...register("gender")}
                    className="border px-2 py-1 bg-white focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                  >
                    <option
                      value="female"
                      selected={user?.gender === "female" && true}
                    >
                      Female
                    </option>
                    <option
                      value="male"
                      selected={user?.gender === "male" && true}
                    >
                      Male
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300">
                    Similar account suggestions
                  </label>
                </div>
                <div className="flex w-[335px] gap-4">
                  <input
                    type="checkbox"
                    className="background dark:text-gray-300 dark:border-[#2d343b]"
                  />
                  <label className="text-[14px] text-[#262626] dark:text-[#8e8e8e]">
                    Include your account when recommending similar accounts
                    people might want to follow.[?]
                  </label>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-start lg:gap-10 gap-1">
                <div className="lg:w-36 flex justify-end">
                  <label className="text-end text-[#262626] text-[16px] font-[600] dark:text-gray-300"></label>
                </div>
                <div className="flex w-[335px] gap-4">
                  <button
                    disabled={isSubmitAvailable}
                    type="submit"
                    className="flex items-center gap-2 bg-[#0095F6] text-[14px] text-white py-1 px-4 rounded"
                  >
                    {updaeProfileLoading && <Loader />}
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AccountWrapper>
  );
};

export default Edit;
