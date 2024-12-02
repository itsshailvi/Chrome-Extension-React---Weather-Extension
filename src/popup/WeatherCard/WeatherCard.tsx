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
  const [weatherData, setWeatherData] = useState(null);
  const [cardState, setCardState] = useState("loading");

  //Weather Details fetching from API from utils
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
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
            {weatherData.main.temp.toFixed()}
          </Typography>
          <Typography style={itemStyles.itemContainerBody}>
            Feels like
            {`  ${Math.round(weatherData.main.feels_like)}`}
          </Typography>
        </Grid>
        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img src={getWeatherIconSrc(weatherData.weather[0].icon)} />
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
