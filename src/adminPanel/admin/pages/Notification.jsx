import React, { useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
  FaTrash,
  FaChevronDown,
} from "react-icons/fa";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Application Received",
      message:
        "Your application for the role of Frontend Developer has been received.",
      type: "info",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      title: "Application Under Review",
      message:
        "Your application for Frontend Developer is being reviewed by our HR team.",
      type: "info",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 3,
      title: "Interview Scheduled",
      message:
        "Your interview for the Frontend Developer position is scheduled on Sep 5 at 10:00 AM.",
      type: "success",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      title: "Reminder: Interview Tomorrow",
      message:
        "This is a reminder for your interview scheduled tomorrow at 10:00 AM.",
      type: "warning",
      time: "12 hours ago",
      read: true,
    },
    {
      id: 5,
      title: "Application Rejected",
      message:
        "We appreciate your interest, but you were not selected for the Frontend Developer position.",
      type: "error",
      time: "2 days ago",
      read: true,
    },
    {
      id: 6,
      title: "Job Offer Sent",
      message:
        "Congratulations! A job offer has been sent to your registered email address.",
      type: "success",
      time: "3 days ago",
      read: true,
    },
    {
      id: 7,
      title: "Offer Accepted",
      message: "You have successfully accepted the job offer. Welcome aboard!",
      type: "success",
      time: "4 days ago",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all"); // 'all', 'unread', 'read'

  const getIconByType = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="text-green-500" />;
      case "warning":
        return <FaExclamationCircle className="text-yellow-500" />;
      case "error":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FaBell className="text-2xl text-blue-900" />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
            <span className="bg-blue-100 text-blue-900 px-2 py-1 rounded-full text-sm">
              {notifications.filter((n) => !n.read).length} unread
            </span>
          </div>

          <div className="flex space-x-2">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none px-3 py-2 pr-8 border border-gray-300 rounded-md bg-white text-gray-700 
               focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 
               hover:border-blue-900 transition duration-200"
              >
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>

              {/* Custom dropdown icon */}
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <MdOutlineArrowDropDown className="w-5 h-5" />
              </div>
            </div>

            <button
              onClick={markAllAsRead}
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Mark all as read
            </button>

            <button
              onClick={clearAll}
              className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FaBell className="text-4xl mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 flex items-start space-x-4 transition-colors ${
                    !notification.read ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    {getIconByType(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-semibold ${
                          !notification.read ? "text-blue-800" : "text-gray-800"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>

                    <p className="text-gray-600 mt-1">{notification.message}</p>

                    <div className="flex space-x-3 mt-3">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-sm text-red-600 hover:text-red-800 flex items-center"
                      >
                        <FaTrash className="mr-1" size={12} />
                        Delete
                      </button>

                      <button
                        onClick={() => navigate("/detail")}
                        className="text-sm text-gray-700 hover:text-blue-900 hover:underline flex items-center"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;