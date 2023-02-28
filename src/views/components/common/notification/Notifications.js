import { Popover, Transition } from "@headlessui/react";
import { Fragment } from 'react';
import { BiHeart } from "react-icons/bi";
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
      <Popover className="lg:mt-1 relative">
          <Popover.Button onClick={readAllNotificationsHandler} className="relative focus:outline-none">
              <BiHeart size={27} className="text-[#262626] dark:text-gray-100" />
              {unreadNotifications > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 rounded-full text-xs text-white w-4 h-4 flex items-center justify-center">{unreadNotifications}</span>)}
          </Popover.Button>

          <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
          >
              <Popover.Panel className="border absolute lg:top-[41px] top-[-375px] lg:right-[0px] right-[-80px]  z-10 mt-2 w-[330px] bg-white dark:bg-[#262626] dark:border-[#2d343b]    ">
                  <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-800">
                      <p className="text-sm font-semibold text-[#262626] dark:text-gray-100">Notifications</p>
                  </div>
                  {renderNotifications()}
              </Popover.Panel>
            
          </Transition>

          
      </Popover>
  )
}

export default Notifications