import { Card } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import contentScriptStyles from "./contentScript.style";
import WeatherCard from "../popup/WeatherCard/WeatherCard";
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utils/storage";
import { Messages } from "../utils/messages";

const App = () => {
  const itemStyles = contentScriptStyles();
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);

//on component mounting getting options from localstorage  
  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  //Publishing on chrome run time as per the Message passed of the toggle overlay and updating as the value chnages for isActive
  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card style={itemStyles.itemContainer}>
          <WeatherCard
            city={options.homeCity}
            tempScale={options.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

render(<App />, root);
