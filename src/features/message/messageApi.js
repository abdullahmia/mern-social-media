import { apiSlice } from "../api/apiSlice";

export const messageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (conversationId) => `/message/${conversationId}`,
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

                let patchResult = dispatch(apiSlice.util.updateQueryData('getMessages', conversationId, (draft) => {
                    draft.push(message);
                }))

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    })
});


export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;