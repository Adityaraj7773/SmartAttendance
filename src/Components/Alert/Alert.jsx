import React from "react";
import styles from "./Alert.module.css";
import closeButton from "../../icons/icons8-close.svg";
import successIcon from "../../icons/success-svgrepo-com.svg";
import errorIcon from "../../icons/error-svgrepo-com.svg";
import warningIcon from "../../icons/warning-svgrepo-com.svg";
import {
  CheckCircleOutline,
  CloseOutlined,
  ErrorOutline,
  WarningAmberOutlined,
} from "@mui/icons-material";

function getBgColor(type) {
  switch (type) {
    case "success":
      return "#4BB543";
    case "error":
      return "#e46b71";
    case "warning":
      return "#ffcc00";
    case "info":
      return "lightblue";
    default:
      return "lightblue";
  }
}
function getIcon(type) {
  switch (type) {
    case "success":
      return <CheckCircleOutline />;
    case "error":
      return <ErrorOutline />;
    case "warning":
      return <WarningAmberOutlined />;
    default:
      return warningIcon;
  }
}
const Alert = ({ id, message, autoClose, type, onClose }) => {
  const bgcolor = getBgColor(type);
  console.log(bgcolor);
  return (
    <div
      className={styles.alert}
      style={{
        backgroundColor: bgcolor,
      }}
    >
      <div>
        <span>
          {getIcon(type)}
          <p style={{ marginLeft: "10px" }}>{message}</p>
        </span>
        {!autoClose && (
          <CloseOutlined
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              onClose(id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Alert;
