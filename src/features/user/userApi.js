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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        let patchResult = dispatch(
          apiSlice.util.updateQueryData("userData", arg.username, (draft) => {
            draft.user = { ...draft.user, ...arg };
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        
        try {
          const {user} = await queryFulfilled;
          dispatch(apiSlice.util.updateQueryData('userData', user._id, (draft) => {
            draft.user.followers = [...user.followers]
          }));

        } catch (err) {
          
        }

      }
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
