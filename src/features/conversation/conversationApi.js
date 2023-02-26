import socket from "../../utils/socket";
import { apiSlice } from "../api/apiSlice";

export const conversationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getConversations: builder.query({
            query: () => `/conversation`,
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch, getState }) {
                // user from the store
                const { user } = getState()?.auth;

                // get all notifications
                socket.on("newConversation", (conversation) => {

                    // if current is on conversation participant list
                    if (conversation.participants.some((participant) => participant._id === user._id)) {
                        updateCachedData((draft) => {
                            // put the new conversation on top
                            draft.unshift(conversation);
                        })
                    }

                });

            },
        }),
        addConversation: builder.mutation({
            query: (body) => ({
                url: "/conversation",
                method: "POST",
                body,
            }),
        }),

        seenConversation: builder.mutation({
            query: (conversationId) => ({
                url: `/conversation/${conversationId}`,
                method: "PATCH",
            }),
            async onQueryStarted(conversationId, { dispatch, queryFulfilled, getState}) { 
                const { user } = getState()?.auth;
                let conversationPatch = dispatch(apiSlice.util.updateQueryData("getConversations", undefined, (draft) => {
                    let conversation = draft.find((conversation) => conversation._id === conversationId);
                    if (conversation) {
                        conversation.seen.push(user._id);
                    }
                }));

                try {
                    await queryFulfilled;
                } catch (error) {
                    conversationPatch.undo();
                }
            }
        }),

    })
})


export const { useAddConversationMutation, useGetConversationsQuery, useSeenConversationMutation } = conversationApi;