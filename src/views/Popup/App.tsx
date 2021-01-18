import React, { useCallback, useEffect, useState } from "react";
import "./App.scss";

function App() {
  const [currentAnchor, setCurrentAnchor] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get(
      {
        dokoAnchor: "bottom-left",
      },
      (result) => {
        setCurrentAnchor(result?.dokoAnchor);
      }
    );
  }, []);

  const onValueChange = useCallback((event) => {
    setCurrentAnchor(event.target.value);
    chrome.storage.sync.set({
      dokoAnchor: event.target.value,
    });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      tabs.forEach(
        (tab) =>
          tab.id && chrome.tabs.sendMessage(tab.id, { storage: "updated" })
      );
    });
  }, []);

  return (
    <div className="container">
      <h1>Position</h1>
      <div
        style={{
          border: "1px dashed rgba(0, 0, 0, 0.3)",
          position: "relative",
          height: "150px",
          width: "150px",
        }}
      >
        <div
          style={{
            height: "100%",
            borderLeft: "1px dashed rgba(0, 0, 0, 0.3)",
            position: "absolute",
            left: "50%",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            borderTop: "1px dashed rgba(0, 0, 0, 0.3)",
            position: "absolute",
            top: "50%",
          }}
        ></div>
        <input
          style={{
            left: "0px",
            position: "absolute",
            top: "0px",
            transform: "translate(-50%, -50%)",
          }}
          name="anchor"
          type="radio"
          value="top-left"
          checked={currentAnchor === "top-left"}
          onChange={onValueChange}
        />

        <input
          style={{
            left: "50%",
            position: "absolute",
            top: "0px",
            transform: "translate(-50%, -50%)",
          }}
          name="anchor"
          type="radio"
          value="top-center"
          checked={currentAnchor === "top-center"}
          onChange={onValueChange}
        />

        <input
          style={{
            position: "absolute",
            right: "0px",
            top: "0px",
            transform: "translate(50%, -50%)",
          }}
          name="anchor"
          type="radio"
          value="top-right"
          checked={currentAnchor === "top-right"}
          onChange={onValueChange}
        />

        <input
          style={{
            position: "absolute",
            right: "0px",
            top: "50%",
            transform: "translate(50%, -50%)",
          }}
          name="anchor"
          type="radio"
          value="center-right"
          checked={currentAnchor === "center-right"}
          onChange={onValueChange}
        />

        <input
          style={{
            bottom: "0px",
            position: "absolute",
            right: "0px",
            transform: "translate(50%, 50%)",
          }}
          name="anchor"
          type="radio"
          value="bottom-right"
          checked={currentAnchor === "bottom-right"}
          onChange={onValueChange}
        />

        <input
          style={{
            bottom: "0px",
            position: "absolute",
            right: "50%",
            transform: "translate(50%, 50%)",
          }}
          name="anchor"
          type="radio"
          value="bottom-center"
          checked={currentAnchor === "bottom-center"}
          onChange={onValueChange}
        />

        <input
          style={{
            bottom: "0px",
            left: "0px",
            position: "absolute",
            transform: "translate(-50%, 50%)",
          }}
          name="anchor"
          type="radio"
          value="bottom-left"
          checked={currentAnchor === "bottom-left"}
          onChange={onValueChange}
        />

        <input
          style={{
            left: "0px",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          name="anchor"
          type="radio"
          value="center-left"
          checked={currentAnchor === "center-left"}
          onChange={onValueChange}
        />

        <input
          style={{
            left: "50%",
            position: "absolute",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          name="anchor"
          type="radio"
          value="center-center"
          checked={currentAnchor === "center-center"}
          onChange={onValueChange}
        />
      </div>
    </div>
  );
}

export default App;
