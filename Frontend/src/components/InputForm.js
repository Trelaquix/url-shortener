import React, { useState, useEffect } from "react";
import { generateShortenedUrl, getOriginalUrl, goToOriginalUrl } from "../services/urlService";
import { inputFormStyles } from "../styles/styles";

function InputForm({ setTitleToDisplay }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [activeTab, setActiveTab] = useState("short");
  const [errorMessage, setErrorMessage] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const checkInitialParams = async () => {
      const currentURL = window.location.href;
      try {
        const goToUrl = await goToOriginalUrl(currentURL);
        if (goToUrl) {
          setTitleToDisplay("Redirecting...");
          window.location = goToUrl;
          setRedirecting(true);
        }
      } catch (error) {
        const stateObj = { path: "/" };
        window.history.pushState(stateObj, "", "/");
        setErrorMessage("Failed to navigate to original URL");
      }
    };
    checkInitialParams();
  }, [setTitleToDisplay]);

  useEffect(() => {
    setOriginalUrl("");
    setShortenedUrl("");
    setErrorMessage(null);
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    if (activeTab === "short" && originalUrl) {
      try {
        let shortenedUrlResult = await generateShortenedUrl(originalUrl);
        setShortenedUrl(`${window.location.origin}/${shortenedUrlResult}`);
      } catch (error) {
        setErrorMessage("Unable to shorten your Url");
      }
    } else if (activeTab === "original" && shortenedUrl) {
      try {
        let originalUrlResult = await getOriginalUrl(shortenedUrl);
        setOriginalUrl(`${originalUrlResult}`);
      } catch (error) {
        setErrorMessage("Unable to retrieve Url");
      }
    }
  };

  return !redirecting && (
    <div style={inputFormStyles.container}>
      <div style={inputFormStyles.tabs}>
        <button
          onClick={() => handleTabChange("short")}
          style={{
            ...inputFormStyles.tabButton,
            ...(activeTab === "short" && inputFormStyles.activeTabButton),
          }}
          data-testid="short-link-tab-button" // Test ID for the tab button
        >
          <span style={inputFormStyles.tabName}>Short Link</span>
        </button>
        <button
          onClick={() => handleTabChange("original")}
          style={{
            ...inputFormStyles.tabButton,
            ...(activeTab === "original" && inputFormStyles.activeTabButton),
          }}
          data-testid="original-link-tab-button" // Test ID for the tab button
        >
          <span style={inputFormStyles.tabName}>Original Link</span>
        </button>
      </div>
      {activeTab === "short" && (
        <form onSubmit={handleSubmit} style={inputFormStyles.form} data-testid="input-form">
          <input
            type="url"
            placeholder="Enter Original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            style={inputFormStyles.input}
          />
          <button type="submit" style={inputFormStyles.button} data-testid="submit-button">
            Get Shorten URL
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      )}
      {activeTab === "original" && (
        <form onSubmit={handleSubmit} style={inputFormStyles.form}>
          <input
            type="url"
            placeholder="Enter Shortened URL"
            value={shortenedUrl}
            onChange={(e) => setShortenedUrl(e.target.value)}
            required
            style={inputFormStyles.input}
          />
          <button type="submit" style={inputFormStyles.button} data-testid="submit-button">
            Get Original URL
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      )}
      {activeTab === "original" && originalUrl && (
        <div style={inputFormStyles.result}>
          <p >Original URL:</p>
          <a data-testid="original-url-text" href={originalUrl} rel="noopener noreferrer">
            {originalUrl}
          </a>
        </div>
      )}
      {activeTab === "short" && shortenedUrl && (
        <div style={inputFormStyles.result}>
          <p data-testid="shortened-url-text">Shortened URL:</p>
          <a href={shortenedUrl} rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default InputForm;
