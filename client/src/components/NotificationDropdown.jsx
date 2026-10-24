import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const { notifications } = state;
  const hasUnread = notifications.some((notification) => !notification.isRead);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: "calc(100% + 0.5rem)",
        width: "340px",
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
        overflow: "hidden",
        zIndex: 30,
        color: "#0f172a",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.8rem 0.9rem",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc",
        }}
      >
        <strong>Notifications</strong>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#64748b",
            fontSize: "1.1rem",
            cursor: "pointer",
          }}
          aria-label="Close notifications"
        >
          ×
        </button>
      </div>

      <div style={{ maxHeight: "360px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <div style={{ padding: "1rem", color: "#64748b", fontSize: "0.9rem" }}>
            No notifications yet.
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={onClose}
            />
          ))
        )}
      </div>

      <div style={{ padding: "0.75rem 0.9rem", borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: "MARK_ALL_READ" });
            onClose();
          }}
          disabled={!hasUnread}
          style={{
            width: "100%",
            border: "none",
            borderRadius: "8px",
            background: hasUnread ? "#4f46e5" : "#cbd5e1",
            color: "#fff",
            padding: "0.65rem 0.75rem",
            cursor: hasUnread ? "pointer" : "not-allowed",
            fontWeight: 600,
          }}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}
