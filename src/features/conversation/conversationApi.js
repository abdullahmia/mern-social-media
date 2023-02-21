import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addConversation: builder.mutation({
            query: (body) => ({
                url: "/conversation",
                method: "POST",
                body,
            }),
        })
    })
})


export const { useAddConversationMutation } = conversationApi;