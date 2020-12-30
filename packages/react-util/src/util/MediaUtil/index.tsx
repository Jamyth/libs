import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

const open = (url: string, type: "image" | "video") => {
  return new Promise<void>((resolve) => {
    const body = document.body;
    const div = document.createElement("div");
    const closeModal = () => {
      body.removeChild(div);
      resolve();
    };

    ReactDOM.render(
      <div className="media-modal" onClick={closeModal}>
        {type === "image" ? (
          <img src={url} />
        ) : (
          <video src={url} autoPlay controls controlsList="nodownload" muted />
        )}
        <div className="close-btn">X</div>
      </div>,
      div,
      () => body.appendChild(div)
    );
  });
};

export const MediaUtil = Object.freeze({
  open,
});
