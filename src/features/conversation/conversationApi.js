import toast from 'react-hot-toast';
import playNotificationSound from '../../utils/NotificationSound';
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
                            draft.push(conversation);
                        })

                        
                        if (user._id === conversation.participants.find((participant) => participant._id !== user._id)._id) {
                            toast.success(`${conversation.participants.find((participant) => participant._id !== user._id).fullName}send you message`);

                            playNotificationSound();
                        }

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
    })
})


export const { useAddConversationMutation, useGetConversationsQuery } = conversationApi;