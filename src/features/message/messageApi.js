import toast from 'react-hot-toast';
import playNotificationSound from "../../utils/NotificationSound";
import socket from "../../utils/socket";
import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (conversationId) => `/message/${conversationId}`,
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch, getState }) {
                const { user } = getState()?.auth || {};

                socket.on("newMessage", (message) => {
                    const { conversationId, receiver } = message;
                    if (receiver._id === user._id) {
                        updateCachedData((draft) => {
                            draft.push(message);
                        })

                        toast.success(`${message.sender.fullName} send you message`);

                        playNotificationSound();

                        // update conversation last message
                        dispatch(apiSlice.util.updateQueryData('getConversations', undefined, (draft) => {
                            const conversation = draft.find((conversation) => conversation._id === conversationId);
                            conversation.lastMessage = message.text;
                            conversation.seen = conversation.seen.filter((id) => id !== user._id);

                            // this conversation is on top
                            const index = draft.indexOf(conversation);
                            draft.splice(index, 1);
                            draft.unshift(conversation);

                            return draft;

                        }))
                    }
                })
            }
        }),
        sendMessage: builder.mutation({
            query: ({conversationId, body}) => ({
                url: `/message/${conversationId}`,
                method: "POST",
                body,
            }),
            async onQueryStarted({conversationId, body}, {dispatch, queryFulfilled, getState}) {
                const { user } = getState()?.auth || {};
                const message = {
                    sender: {
                        _id: user._id,
                        image: user.image,
                        fullName: user.fullName,
                        username: user.username,
                    },
                    receiver: body.receiver,
                    text: body.text,
                }

                let messagePatch = dispatch(apiSlice.util.updateQueryData('getMessages', conversationId, (draft) => {
                    draft.push(message);
                }))


                const conversationPatch = dispatch(apiSlice.util.updateQueryData('getConversations', undefined, (draft) => {
                    const conversation = draft.find((conversation) => conversation._id === conversationId);
                    conversation.lastMessage = body.text;
                    conversation.seen = [user._id];

                    // this conversation is on top
                    const index = draft.indexOf(conversation);
                    draft.splice(index, 1);
                    draft.unshift(conversation);

                }))

                try {
                    await queryFulfilled;
                } catch {
                    conversationPatch.undo();
                    messagePatch.undo();
                }
            },
        }),
    })
});


export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;