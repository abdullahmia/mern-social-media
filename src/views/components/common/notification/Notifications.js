import { Popover } from "@headlessui/react";
import { useGetAllNotificationsQuery, useReadNotificationsMutation } from "../../../../features/notification/notificationApi";
import Notification from "./Notification";

const Notifications = () => {
    const { data, isLoading, isError } = useGetAllNotificationsQuery()
    const { unreadNotifications, notifications } = data || {};

    // render notifications
    const renderNotifications = () => {
        if (isLoading) return <p>Loading...</p>
        if (isError) return <div className="px-3 py-2 items-center justify-center">
            <p className="text-sm dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300">Someting went wrong!</p>
        </div>
        if (notifications.length === 0) return <div className="px-3 py-2 items-center justify-center">
            <p className="text-sm dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300">No notifications</p>
        </div>
        // render notificaiton
        if (notifications.length > 0) {
            return <div className="divide-y-[1px] dark:divide-gray-900 h-80 overflow-y-scroll">
                {notifications.map((notification, key) => (
                    <Notification key={key} notification={notification} />
                ))}
            </div>
        }
    }

    // read all notifications
    const [readNotifications] = useReadNotificationsMutation();
    const readAllNotificationsHandler = () => {
        readNotifications()
    }

  return (
      <Popover className="mt-1 relative">
          <Popover.Button onClick={readAllNotificationsHandler} className="relative focus:outline-none">
              <svg
                  aria-label="Activity Feed"
                  className="dark:text-gray-200"
                  // color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
              >
                  <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
              </svg>
              {unreadNotifications > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs text-white w-4 h-4 flex items-center justify-center">{unreadNotifications}</span>)}
          </Popover.Button>

          <Popover.Panel className="border absolute right-[0px] top-[36px] z-10 mt-2 w-[330px] bg-white dark:bg-gray-700 dark:border-[#2d343b]    ">
              <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-800">
                  <p className="text-sm font-semibold">Notifications</p>
                  <button disabled={unreadNotifications === 0 && true} className="text-sm p-1 rounded dark:hover:bg-gray-600 dark:hover:text-white text-[#262626] dark:text-gray-300">Mark all as read</button>
              </div>
              {renderNotifications()}
          </Popover.Panel>
      </Popover>
  )
}

export default Notifications