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

          dispatch(userLoggedIn({ user, token }));
          
        } catch (err) {
          // do nothing
        }
      },
    }),

    registerUser: builder.mutation({
      query: (content) => {
        return {
          url: `/auth/register`,
          method: "POST",
          body: content,
        };
      },
    }),

    isExitUser: builder.query({
      query: (username) => `/auth/isuser?username=${username}`
    }),
    
    passwordChange: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/change-password`,
          method: "PATCH",
          body: body,
        };
      },
    }),

    forgotPasswordEmailSend: builder.mutation({
      query: (body) => {
        return {
          url: `/auth/forgot-password`,
          method: "POST",
          body: body,
        };
      },
    }),

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
  useIsExitUserQuery,
  useForgotPasswordEmailSendMutation,
  usePasswordChangeMutation,
  useResetPasswordMutation,
} = authApi;
