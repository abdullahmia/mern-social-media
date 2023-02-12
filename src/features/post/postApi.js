import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // new post
    addPost: builder.mutation({
      query: (body) => {
        return {
          url: "/post",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["posts"],
    }),

    // get posts
    getPosts: builder.query({
      query: () => "/post",
      providesTags: ["posts"],
    }),

    // like a post
    likePost: builder.mutation({
      query: (id) => {
        return {
          url: `/post/like/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["posts"],
    }),

    // unlike a post
    unlikePost: builder.mutation({
      query: (id) => {
        return {
          url: `/post/unlike/${id}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} = postApi;
