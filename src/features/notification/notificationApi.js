import socket from '../../utils/socket';
import { apiSlice } from "../api/apiSlice";

export const notificaitonApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotifications: builder.query({
            query: () => "/notification",
            async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, updateCachedData, dispatch, getState }) {
                // user from the store
                const { user } = getState()?.auth;

                // get all notifications
                socket.on("notification", (notification) => {
                    console.log(notification);
                    if (notification.recipient._id === user._id) {
                        updateCachedData((draft) => {
                            draft.notifications.unshift(notification);
                            draft.unreadNotifications += 1;
                        })
                    }
                });
            },
        }),
        readNotifications: builder.mutation({
            query: () => ({
                url: "/notification/read",
                method: "PATCH",
            }),
            async onQueryStarted(arg, {queryFulfilled, dispatch, getState}) {
                const {user} = getState()?.auth;
                let patchResult = dispatch(apiSlice.util.updateQueryData("getAllNotifications", undefined, (draft) => {
                    draft.notifications = draft.notifications.map((notification) => {
                        if (notification.recipient._id === user._id) {
                            notification.isRead = true;
                        }
                        return notification;
                    });
                    draft.unreadNotifications = 0;
                }))

                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResult.undo();
                }
            },
        })
        
    })
})


export const { useGetAllNotificationsQuery, useReadNotificationsMutation } = notificaitonApi;