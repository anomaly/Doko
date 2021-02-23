import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import root from "react-shadow";
import styles from "./index.scss";
import {
  getEnvironment,
  getFacts,
  getReport,
  getSubtitle,
  getTitle,
} from "./utils";

const Container = () => {
  return (
    <root.div>
      <Content />
    </root.div>
  );
};

const repoRegex = /(?:https?)?:?(?:\/\/)?(?:(?:[a-z-]+\.?)+)\/([a-z-]+)\/([a-z-]+)/g

function Content() {
  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get(
      {
        dokoAnchor: "bottom-left",
      },
      (result) => setAnchor(result?.dokoAnchor)
    );
  }, []);

  const [envClass, setEnvClass] = useState<string>("");

  useEffect(() => {
    // Handling storage update notifications via message because
    // the storage.onChange listener is broken in Safari
    // https://developer.apple.com/forums/thread/670007
    const messagelistener = (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (message.storage === "updated") {
        chrome.storage.sync.get(
          {
            dokoAnchor: "bottom-left",
          },
          (result) => setAnchor(result?.dokoAnchor)
        );
      }
    };

    chrome.runtime.onMessage.addListener(messagelistener);

    return () => {
      chrome.runtime.onMessage.removeListener(messagelistener);
    };
  }, []);

  const envLabel = useMemo(() => {
    let envLabel = "";
    switch (getEnvironment()) {
      case "production":
        setEnvClass("environment__production");
        envLabel = "P";
        break;
      case "staging":
        setEnvClass("environment__staging");
        envLabel = "S";
        break;
      case "development":
        setEnvClass("environment__development");
        envLabel = "D";
        break;
    }
    return envLabel;
  }, []);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const mouseEnter = useCallback(() => {
    !open && setExpanded(true);
  }, [open]);
  const mouseLeave = useCallback(() => {
    !open && setExpanded(false);
  }, [open]);

  const toggleOpen = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  const arrowImg = useMemo(() => {
    return chrome.runtime.getURL("arrow.svg");
  }, []);

  const issueImg = useMemo(() => {
    return chrome.runtime.getURL("issue.svg");
  }, []);
  
  const reportPath = useMemo(() => {
    const regexMatch = repoRegex.exec(getReport() as string);
    return {
      org: regexMatch && regexMatch[1],
      repo: regexMatch && regexMatch[2]
    }
  }, [])

  return (
    <div
      className={clsx("doko container", anchor, {
        expand: expanded,
        open: open,
      })}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="top" onClick={toggleOpen}>
        <div className={clsx("environment environment__production", envClass)}>
          {envLabel}
        </div>
        <div className="title-section">
          <span className="title">{getTitle()}</span>
          <span className="subtitle">{getSubtitle()}</span>
        </div>
        <img src={arrowImg} alt="arrow icon" className="arrow" />
      </div>

      <div className="expanded-container">
        {getFacts() && (
          <table className="facts">
            {getFacts()?.map((fact) => {
              const [factKeyString, factValueString] = fact.split("|");
              return (
                <tr>
                  <td className="facts__key">{factKeyString}</td>
                  <td className="facts__value">{factValueString}</td>
                </tr>
              );
            })}
          </table>
        )}
        {getReport() && (
          <a
            href={getReport() as string}
            target="_blank"
            rel="noreferrer"
            className="issue"
          >
            <div className="issue__main">
              <img src={issueImg} alt="issue logo" className="issue__icon" />
              <span>Open an Issue</span>
            </div>
            <span className="issue__subtext">{reportPath.org}/{reportPath.repo}</span>
          </a>
        )}
      </div>
      <style type="text/css">{styles.toString()}</style>
    </div>
  );
}

const hasDoko = document.querySelector('meta[name^="doko:"');

if (hasDoko) {
  const app = document.createElement("div");
  app.id = "doko-root";
  document.body.append(app);

  ReactDOM.render(
    <React.StrictMode>
      <Container />
    </React.StrictMode>,
    app
  );
}
