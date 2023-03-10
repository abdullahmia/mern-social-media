import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import appleStore from "../../../assets/appstore.png";
import facebook from "../../../assets/facebook.png";
import playStore from "../../../assets/googleplay.png";
import logo from "../../../assets/logo.png";
import { useIsExitUserQuery, useRegisterUserMutation } from "../../../features/auth/authApi";
import Loader from "../../components/common/loaders/Loader";
import Wrapper from "../../components/custom/Wrapper";

const Signup = () => {
  const [message, setMessage] = useState("");
  const [usernameTerm, setUsernameTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitAvailable, setIsSubmitAvailable] = useState(false);

  const navigate = useNavigate();

  // debounce username
  useEffect(() => {
    setMessage("");
    const debounceTimer = setTimeout(() => {
      setDebouncedTerm(usernameTerm);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [usernameTerm]);

  // check username is exist
  const {data: isExitUser, isLoading: isExitUserLoading} = useIsExitUserQuery(debouncedTerm);
  useEffect(() => {
    if (isExitUser) {
      const {isUser} = isExitUser;
      if (isUser) {
        setMessage("Username is already taken");
        setIsSubmitAvailable(true);
      } else {
        setMessage("");
        setIsSubmitAvailable(false);
      }
    }

  }, [isExitUser, isExitUserLoading]);
  

  // login form submit
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const signupSubmit = async (data) => {
    await registerUser(data).then((res) => {
      if (res.data) {
        reset();
        navigate("/login");
      }
      if (res.error) {
        setMessage(res.error.data.message);
      }
    });
  };

  return (
    <Wrapper title="Sign up • Instagram">
      <div className="w-full">
        <div className="flex pt-10 justify-center gap-6">
          <div>
            <div className="bg-[#FFFFFF] w-[348px] pb-8 px-8 border border-[#d3d0d0] dark:bg-[#252a30] dark:border-[#2d343b]">
              <div className="py-10 flex flex-col justify-center">
                <div className="flex flex-col justify-center items">
                  <img src={logo} alt="" className="w-40 mx-auto" />
                  <p className="text-[17px] text-[#8e8e8e] font-[600] text-center">
                    Sign up to see photos and videos from your friends.
                  </p>
                </div>
                <button className="mt-5 flex justify-center items-center gap-2 capitalize text-sm bg-blue-500 py-1.5 rounded">
                  <img src={facebook} alt="" className="w-4" />
                  <span className="text-white text-sm font-[600]">
                    Log in with Facebook
                  </span>
                </button>
                <div className="relative mt-4 h-px bg-gray-300 background">
                  <div className="absolute left-0 top-0 flex justify-center w-full -mt-2">
                    <span className="px-4 text-xs text-gray-500 uppercase background">
                      Or
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {message && (
                  <p className="text-[12px] mb-5 text-[#b63131] px-2 text-center">
                    {message}
                  </p>
                )}
                <form
                  onSubmit={handleSubmit(signupSubmit)}
                  className="flex flex-col gap-3"
                >
                  <input
                    {...register("email")}
                    type="text"
                    className="border text-xs py-2.5 bg-gray-50 px-3 rounded focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                    placeholder="Email address"
                    required
                  />
                  <input
                    {...register("fullName")}
                    type="text"
                    className="border text-xs py-2.5 bg-gray-50 px-3 rounded focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                    placeholder="Full Name"
                    required
                  />
                  <input
                    {...register("username")}
                    type="text"
                    className="border text-xs py-2.5 bg-gray-50 px-3 rounded focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                    placeholder="Username"
                    onChange={(e) => setUsernameTerm(e.target.value)}
                    required
                    autoComplete="off"
                  />
                  <input
                    {...register("password")}
                    type="password"
                    className="border text-xs py-2.5 px-3 rounded focus:outline-none background dark:text-gray-300 dark:border-[#2d343b]"
                    placeholder="Password"
                    required
                  />
                  <p className="text-[12px] text-[#8e8e8e] px-2 text-center">
                    People who use our service may have uploaded your contact
                    information to Instagram. <b>Learn more</b>
                  </p>
                  <p className="text-[12px] text-[#8e8e8e] px-2 text-center">
                    By signing up, you agree to our{" "}
                    <b>Terms, Privacy Policy and Cookies Policy</b>
                  </p>
                  <button
                    disabled={isSubmitAvailable}
                    type="submit"
                    className="flex items-center justify-center gap-4 capitalize text-sm bg-blue-500 text-white py-1.5 rounded"
                  >
                    {isLoading && <Loader />}
                    Sign Up
                  </button>
                </form>
              </div>
            </div>

            <div className="bg-white mt-4 py-6 border border-[#d3d0d0] dark:bg-[#252a30] dark:border-[#2d343b]">
              <h2 className="text-center text-[14px] text-[#262626] dark:text-gray-300">
                Don't have an account?{" "}
                <Link to="/login" className="text-[#0095f6] font-[600]">
                  Log In
                </Link>
              </h2>
            </div>

            {/* App Section */}
            <div className="py-6">
              <h2 className="text-center text-[14px] text-[#262626]">
                Get the app.
              </h2>
              <div className="mt-4 flex items-center justify-center gap-2">
                <img src={appleStore} className="w-32" alt="" />
                <img src={playStore} className="w-32" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Signup;
