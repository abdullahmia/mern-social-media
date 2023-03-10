import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiLockAlt } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useForgotPasswordEmailSendMutation } from "../../../features/auth/authApi";
import Loader from "../../components/common/loaders/Loader";
import Wrapper from "../../components/custom/Wrapper";

const PasswordReset = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();

  const location = useLocation();
  const urlMessage = location.search.split("=")[1];

  useEffect(() => {
    if (urlMessage === "invalid") {
      setMessage("Invalid or expired token");
    }
  }, [urlMessage]);

  const [
    forgotPasswordEmailSend,
    { isLoading, isError, data, isSuccess, error: responseError },
  ] = useForgotPasswordEmailSendMutation();
  // login form submit handler
  const passwordResetSubmit = async (data) => {
    forgotPasswordEmailSend(data);
  };

  useEffect(() => {
    setError("");
    setSuccess("");

    if (isSuccess) {
      setSuccess(data.message);
      reset();
    }

    if (isError) {
      const { data } = responseError || {};
      setError(data.message);
    }
  }, [isSuccess, data, isError, responseError, reset]);

  return (
    <Wrapper title="Reset Password • Instagram">
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-[#FFFFFF] w-[348px] border border-[#d3d0d0]">
          <div className="px-8">
            <div className="flex flex-col justify-center items-center gap-2 pt-8">
              <div className="border border-black h-24 w-24 flex justify-center items-center rounded-full">
                <BiLockAlt className="text-[35px] text-black" />
              </div>
              <h2 className="text-[#262626] text-[16px] font-[600]">
                Trouble Logging In?
              </h2>
              <p className="text-[13px] text-[#8e8e8e]">
                Enter your email, phone, or username and we'll send you a link
                to get back into your account.
              </p>
            </div>

            {message && (
              <p className="text-[14px] my-5 text-[#b63131] px-2 text-center">
                {message}
              </p>
            )}

            {error && (
              <p className="text-[14px] my-5 text-[#b63131] px-2 text-center">
                {error}
              </p>
            )}

            {success && (
              <p className="text-[14px] my-5 px-2 text-center dark:text-gray-500">
                {success}
              </p>
            )}

            <form
              onSubmit={handleSubmit(passwordResetSubmit)}
              className="flex flex-col gap-3 mt-5"
            >
              <input
                {...register("email")}
                type="text"
                className="border text-xs py-2.5 bg-gray-50 px-3 rounded-md focus:outline-none"
                placeholder="Email address"
                required
              />

              <button
                type="submit"
                className="flex items-center gap-2 justify-center capitalize text-sm bg-blue-500 text-white py-1.5 rounded"
              >
                {isLoading && <Loader />}
                send password reset link
              </button>
            </form>

            <div className="relative mt-10 h-px bg-gray-300">
              <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span className="bg-white px-4 text-xs text-gray-500 uppercase">
                  Or
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 flex flex-col gap-4">
            <Link
              to="/signup"
              className="capitalize text-[14px] text-[#262626] font-[600]"
            >
              Create new account
            </Link>
            <Link
              to="/login"
              className="mt-10 w-full inline-block capitalize border py-2 text-[#262626] text-[14px] font-[600]"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PasswordReset;
