import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // get posts
    getPosts: builder.query({
      query: () => "/post",
    }),

    // new post
    addPost: builder.mutation({
      query: (body) => {
        return {
          url: "/post",
          method: "POST",
          body,
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const resultAction = await queryFulfilled;
          const { post } = resultAction.data || {};

          dispatch(
            apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.unshift(post);
            })
          );
        } catch (err) {
          // nothing do
        }
      },
    }),

    // like a post
    likePost: builder.mutation({
      query: (id) => {
        return {
          url: `/post/like/${id}`,
          method: "PATCH",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        console.log("onQueryStarted", arg);
        const userId = getState()?.auth?.user?._id;
        let patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            let post = draft.find((post) => post._id === arg);
            if (post) {
              post.likes.push(userId);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    // unlike a post
    unlikePost: builder.mutation({
      query: (id) => {
        return {
          url: `/post/unlike/${id}`,
          method: "PATCH",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        const userId = getState()?.auth?.user?._id;
        let patchResult = dispatch(
          apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
            let post = draft.find((post) => post._id === arg);
            if (post) {
              post.likes = post.likes.filter((id) => id !== userId);
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
