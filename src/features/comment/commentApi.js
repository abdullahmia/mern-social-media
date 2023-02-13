import { apiSlice } from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addComment: builder.mutation({
            query: (body) => ({
                url: "/comment",
                method: "POST",
                body,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    const comment = result?.data;
                    dispatch(apiSlice.util.updateQueryData("getPosts", undefined, (draft) => {
                        let post = draft.find((post) => post._id === comment.post._id);
                        if (post) {
                            post.comments += 1;
                        }
                    }))
                } catch (err) {
                    // nothing do
                }
            }
        }),
        
    })
})


export const { useAddCommentMutation } = commentApi;