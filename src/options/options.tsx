import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import {
  InputBase,
  IconButton,
  Paper,
  Box,
  Grid,
  CardContent,
  Card,
  Typography,
  TextField,
  Button,
  Switch,
} from "@material-ui/core";
import {
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";
const App = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  //Displaying option field data from storage on component did mount
  useEffect(() => {
    getStoredOptions().then((storedOptions) =>
      setOptions({
        homeCity: storedOptions?.homeCity || "",
        hasAutoOverlay: storedOptions?.hasAutoOverlay ?? false,
        tempScale: storedOptions?.tempScale,
      })
    );
  }, []);
  
  //Customizing home city chnages 
  const handleHomeCityChange = (homeCity: string) => {
    setOptions((prev) => ({
      ...prev!,
      homeCity,
    }));
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions((prev) => ({
      ...prev!,
      hasAutoOverlay,
    }));
  };

  const handleSaveButtonClick = () => {
    if (!options) {
      console.error("Options are null. Cannot save.");
      return;
    }
  
    setFormState("saving");
    setStoredOptions(options).then(() =>
      setTimeout(() => {
        setFormState("ready");
      }, 1000)
    );
  };
  

  const isFieldDisabled = formState === "saving";

  if (!options) {
    return null;
  }
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4"> Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1"> Home City Name</Typography>
              <TextField
                disabled={isFieldDisabled}
                placeholder="Enter a home city name"
                value={options.homeCity}
                onChange={(event) => handleHomeCityChange(event.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on webpage load
              </Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleAutoOverlayChange(checked)}
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);

render(<App />, root);
