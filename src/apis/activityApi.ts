import { Activity, Weather } from "../store/activityStore";
import { deStructureWeatherMap, formatQuery } from "../utils/activityUtil";

const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export type queryParams = {
  lat?: number;
  lon?: number;
  units?: string;
};

const fetchWeather = async (query: queryParams): Promise<Weather> => {
  const weatherData = localStorage.getItem("weatherInfo");
  if (!weatherData) {
    const response = await fetch(`${BASE_URL}/weather?${formatQuery(query)}`);
    let res = await response.json();
    let weatherInfo = deStructureWeatherMap(res);
    localStorage.setItem("weatherInfo", JSON.stringify(weatherInfo));
    return weatherInfo as Weather;
  } else {
    const weather: Weather = JSON.parse(weatherData) as Weather;
    return weather;
  }
};

const fetchActivities = async (): Promise<Activity[]> => {
  const allActivities = localStorage.getItem("activities");
  if (allActivities) {
    const activties: Activity[] = JSON.parse(allActivities) as Activity[];
    return activties;
  }
  return [] as Activity[];
};

export { fetchWeather, fetchActivities };
