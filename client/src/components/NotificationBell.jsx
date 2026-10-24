import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationDropdown from "./NotificationDropdown.jsx";

export default function NotificationBell() {
  const { state } = useNotifications();
  const { unreadCount } = state;
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.3rem", color: "#fff" }}
        aria-label={`Notifications, ${unreadCount} unread`}
      >
        🔔
      </button>
      {unreadCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-6px",
            right: "-8px",
            minWidth: "1.2rem",
            height: "1.2rem",
            borderRadius: "9999px",
            background: "#ef4444",
            color: "#fff",
            fontSize: "0.65rem",
            fontWeight: 700,
            lineHeight: "1.2rem",
            textAlign: "center",
            padding: "0 0.2rem",
            boxShadow: "0 0 0 2px rgba(30, 27, 75, 1)",
          }}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
      {open && <NotificationDropdown onClose={() => setOpen(false)} />}
    </div>
  );
}
