import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: () => `/conversation`,
        }),
        addConversation: builder.mutation({
            query: (body) => ({
                url: "/conversation",
                method: "POST",
                body,
            }),
            async onQueryStarted({body}, {dispatch, queryFulfilled}) {
                try {
                    const result = await queryFulfilled;
                    const { data } = result;
                    dispatch(apiSlice.util.updateQueryData('getConversations', undefined, (draft) => {
                        draft.push(data);
                    }))
                } catch (err) {
                    // do nothing
                }
            }
        }),

       
    })
})


export const { useAddConversationMutation, useGetConversationsQuery } = conversationApi;