import React from "react";
import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";

const Notification = ({ notification }) => {
  const variant = notification.type === "success" ? "success" : "danger";

  return (
    <div>
      <Alert variant={variant}>{notification.msg}</Alert>
    </div>
  );
};

const Notifications = () => {
  const notifications = useSelector(({ notifications }) => notifications);

  return (
    <div>
      {notifications.map((notif) => (
        <Notification key={notif.id} notification={notif} />
      ))}
    </div>
  );
};

export default Notifications;
