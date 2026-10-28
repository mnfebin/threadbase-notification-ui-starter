export const initialState = {
  notifications: [],
  unreadCount: 0,
};

export function notificationReducer(state, action) {
  switch (action.type) {

    case "ADD_NOTIFICATION": {
      const nextNotification = action.payload;
      if (!nextNotification) return state;

      const notifications = [nextNotification, ...state.notifications].slice(0, 50);
      const unreadCount = state.unreadCount + (nextNotification.isRead ? 0 : 1);

      return {
        ...state,
        notifications,
        unreadCount,
      };
    }

    case "MARK_READ": {
      const target = state.notifications.find((notification) => notification.id === action.payload);
      if (!target || target.isRead) return state;

      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.payload ? { ...notification, isRead: true } : notification
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      };
    }

    case "MARK_ALL_READ": {
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({ ...notification, isRead: true })),
        unreadCount: 0,
      };
    }

    case "LOAD_NOTIFICATIONS": {
      const notifications = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        notifications,
        unreadCount: notifications.filter((notification) => !notification.isRead).length,
      };
    }

    default:
      return state;
  }
}
