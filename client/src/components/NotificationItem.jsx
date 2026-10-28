import apiClient from "../services/apiClient.js";
import { useNotifications } from "../context/NotificationContext.jsx";

export default function NotificationItem({ notification, onClose }) {
  const { dispatch } = useNotifications();

  const handleClick = async () => {
    if (notification.isRead) {
      onClose?.();
      return;
    }

    dispatch({ type: "MARK_READ", payload: notification.id });

    try {
      await apiClient.patch(`/api/notifications/${notification.id}/read`);
    } catch (error) {
      console.error("[NotificationItem] mark-as-read error:", error);
    } finally {
      onClose?.();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        width: "100%",
        border: "none",
        borderBottom: "1px solid #e2e8f0",
        background: notification.isRead ? "#f8fafc" : "#eef2ff",
        textAlign: "left",
        padding: "0.85rem 0.9rem",
        cursor: "pointer",
        color: "#0f172a",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem" }}>
        <div
          style={{
            flex: 1,
            fontSize: "0.85rem",
            lineHeight: 1.5,
            fontWeight: notification.isRead ? 500 : 700,
            color: notification.isRead ? "#475569" : "#1e293b",
          }}
        >
          {notification.message}
        </div>
        {!notification.isRead && (
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "9999px",
              background: "#4f46e5",
              display: "inline-block",
              marginTop: "0.35rem",
              flexShrink: 0,
            }}
          />
        )}
      </div>
      <div style={{ marginTop: "0.4rem", fontSize: "0.7rem", color: "#64748b" }}>
        {new Date(notification.createdAt).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
      </div>
    </button>
  );
}
