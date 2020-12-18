import clsx from "clsx";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import {
  getEnvironment,
  getFacts,
  getReport,
  getSubtitle,
  getTitle,
} from "./utils";

const githubPathRegex = /(?<=\/)([\w-]+(?=[/]|$))/g;

function Content() {
  const [githubInfo, setGithubInfo] = useState<{ org: string; repo: string }>();

  const [anchor, setAnchor] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get({ dokoAnchor: "bottom-left" }, (result) => {
      setAnchor(result?.dokoAnchor);
    });
  }, []);

  const [envClass, setEnvClass] = useState<string>("");

  useEffect(() => {
    const listener = function (changes: any, namespace: any) {
      if (namespace === "sync") {
        const anchor = changes["dokoAnchor"];
        if (anchor) {
          console.log(anchor);
          setAnchor(anchor.newValue);
        }
      }
    };
    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
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
    return chrome.extension.getURL("arrow.svg");
  }, []);

  const githubImg = useMemo(() => {
    return chrome.extension.getURL("github.svg");
  }, []);

  useEffect(() => {
    const match = getReport()?.match(githubPathRegex) as RegExpMatchArray;
    if (match) {
      setGithubInfo({
        org: match[0],
        repo: match[1],
      });
    }
  }, []);

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
            className="github"
          >
            <div className="github__main">
              <img src={githubImg} alt="github logo" className="github__icon" />
              <span>Open an Issue</span>
            </div>
            {githubInfo && (
              <span className="github__subtext">
                {githubInfo?.org}/{githubInfo?.repo}
              </span>
            )}
          </a>
        )}
      </div>
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
      <Content />
    </React.StrictMode>,
    document.getElementById("doko-root")
  );
}
