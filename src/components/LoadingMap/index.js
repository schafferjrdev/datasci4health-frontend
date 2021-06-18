import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";

const LoadingMap = () => {
  return (
    <div className="leaflet-container loading-container">
      <LoadingOutlined style={{ fontSize: 64 }} />
    </div>
  );
};

export default LoadingMap;
