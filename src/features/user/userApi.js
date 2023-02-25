import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "../auth/authSlice";

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
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const {user, token} = getState()?.auth;
          const result = await queryFulfilled;
          const { data } = result;
          const { image } = data || {};

          // update the store
          dispatch(userLoggedIn({user: {...user, image}, token}))

          // update userData cache
          dispatch(
            apiSlice.util.updateQueryData("userData", user.username, (draft) => {
              draft.user.image = image;
            })
          );


        } catch (err) { 
          // do nothing
        }
      }
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
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const {user: currentUser} = getState()?.auth;

        // update suggestionUsers cache
        let patchResult = dispatch(
          apiSlice.util.updateQueryData("suggestionUsers", undefined, (draft) => {
            let user = draft.find((user) => user._id === arg);
            user.followers.push(currentUser._id);
          }
        ));

        // update userData cache
        let patchResult2 = dispatch(
          apiSlice.util.updateQueryData("userData", currentUser.username, (draft) => {
            draft.user.following.push(arg);
          }
        ));

        try {
          let result = await queryFulfilled;
          const {user} = result.data;

          dispatch(apiSlice.util.updateQueryData("userData", user.username, (draft) => {
            draft.user.followers.push(currentUser._id);
          }));

        } catch (err) {
          patchResult.undo();
          patchResult2.undo();
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
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const {user: currentUser} = getState()?.auth;

        
        let patchResult = dispatch(
          apiSlice.util.updateQueryData("suggestionUsers", undefined, (draft) => {
            let user = draft.find((user) => user._id === arg);
            user.followers = user.followers.filter((follower) => follower !== currentUser._id);
          }
        ));

        let patchResult2 = dispatch(
          apiSlice.util.updateQueryData("userData", currentUser.username, (draft) => {
            draft.user.following = draft.user.following.filter((following) => following !== arg);
          }
        ));

        try {
          const result = await queryFulfilled;
          const {user} = result.data;

          dispatch(apiSlice.util.updateQueryData("userData", user.username, (draft) => {
            draft.user.followers = draft.user.followers.filter((follower) => follower !== currentUser._id);
          }))

        } catch (err) {
          patchResult.undo();
          patchResult2.undo();
        }
      }
    }),

    // get followers
    getFollowers: builder.query({
      query: () => `/user/followers`,
    }),

    // search user by username
    searchUser: builder.query({
      query: (username) => `/user/search?username=${username}`,
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
  useGetFollowersQuery,
  useSearchUserQuery
} = userApi;
