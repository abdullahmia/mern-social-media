import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (content) => {
        return {
          url: `/auth/login`,
          method: "POST",
          body: content,
        };
      },
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const { user, token } = data || {};

          // update the store
          dispatch(userLoggedIn({ user, token }));

          // save the token to local storage
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        } catch (err) {
          // do nothing
        }
      },
    }),

    // create a user by admin
    registerUser: builder.mutation({
      query: (content) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: content,
        };
      },
    }),

    // password change
    passwordChange: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/change-password`,
          method: "PATCH",
          body: body,
        };
      },
    }),

    // forgot password email send
    forgotPasswordEmailSend: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: body,
        };
      },
    }),

    // reset password
    resetPassword: builder.mutation({
      query: ({ user, token, body }) => {
        return {
          url: `/auth/reset-password/${user}/${token}`,
          method: "PATCH",
          body: body,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordEmailSendMutation,
  usePasswordChangeMutation,
  useResetPasswordMutation,
} = authApi;
