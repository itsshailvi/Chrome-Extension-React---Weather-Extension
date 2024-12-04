import React, { useEffect, useState } from "react";
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  getWeatherIconSrc,
  OpenWeatherTempScale,
} from "../../utils/api";
import {
  Card,
  Box,
  CardContent,
  Grid,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import WeatherCardStyles from "./WeatherCard.styles";
interface cityProps {
  city?: string;
  onDelete?: () => void;
  tempScale: OpenWeatherTempScale;
}

interface cityContainerProps {
  children: React.ReactNode;
  onDelete?: () => void;
}

const initialWeatherData: OpenWeatherData = {
  name: "",
  main: { temp: 0, feels_like: 0, humidity: 0, pressure: 0, temp_max: 0, temp_min: 0 },
  weather: [],
  wind: { deg: 0, speed: 0 },
};

const WeatherCardContainer = ({ children, onDelete }: cityContainerProps) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = "loading" | "error" | "ready";
const WeatherCard = ({ city, onDelete, tempScale }: cityProps) => {
  const itemStyles = WeatherCardStyles();
  const [weatherData, setWeatherData] = useState<OpenWeatherData>(initialWeatherData);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  // Weather Details fetching from API
  useEffect(() => {
    const validCity = city || "New York"; // Provide a default city if undefined
    fetchOpenWeatherData(validCity, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch(() => {
        setCardState("error");
      });
  }, [city, tempScale]);

  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="body1">
          {cardState == "loading"
            ? "Loading..."
            : "Error: Could not retrieve weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent="space-around">
        <Grid item>
          <Typography style={itemStyles.itemContainerTitle}>
            {weatherData.name}
          </Typography>
          <Typography style={itemStyles.itemContainerTemp}>
            {weatherData.main.temp !== undefined
              ? weatherData.main.temp.toFixed()
              : "N/A"}
          </Typography>
          <Typography style={itemStyles.itemContainerBody}>
            Feels like{" "}
            {weatherData.main.feels_like !== undefined
              ? Math.round(weatherData.main.feels_like)
              : "N/A"}
          </Typography>
        </Grid>
        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img
                src={getWeatherIconSrc(weatherData.weather[0].icon)}
                alt="Weather Icon"
              />
              <Typography style={itemStyles.itemContainerBody}>
                {weatherData.weather[0].main}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
