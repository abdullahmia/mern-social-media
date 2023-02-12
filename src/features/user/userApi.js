import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userData: builder.query({
      query: (username) => `/user/user/${username}`,
    }),

    // update profile
    updateProfile: builder.mutation({
      query: (body) => {
        return {
          url: `/user/update-profile`,
          method: "PATCH",
          body: body,
        };
      },
    }),

    // update profile picture
    updateProfilePicture: builder.mutation({
      query: (body) => {
        return {
          url: `/user/upload-profile-picture`,
          method: "PATCH",
          body: body,
        };
      },
    }),

    // suggestion users
    suggestionUsers: builder.query({
      query: () => `/user/suggested`,
    }),

    // Follow a user by id
    follow: builder.mutation({
      query: (id) => {
        return {
          url: `/user/follow/${id}`,
          method: "PATCH",
        };
      },
    }),
    // Follow a user by id
    unfollow: builder.mutation({
      query: (id) => {
        return {
          url: `/user/unfollow/${id}`,
          method: "PATCH",
        };
      },
    }),
  }),
});

export const {
  useFollowMutation,
  useUnfollowMutation,
  useSuggestionUsersQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useUserDataQuery,
} = userApi;
