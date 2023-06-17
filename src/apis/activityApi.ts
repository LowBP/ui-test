import { Activity, Weather } from "../store/activityStore";

const APIKey = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export type queryParams = {
  lat?: number;
  lon?: number;
  units?: string;
};

const formatQuery = (query: queryParams) => {
  let queries = "";
  for (let key in query) {
    queries += key + "=" + query[key as keyof queryParams] + "&";
  }
  return `${queries}appid=${APIKey}`;
};

export const deStructureWeatherMap = (data: any) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    sys: { country },
    weather,
    timezone,
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    details,
    icon,
    timezone,
    country,
  };
};

const fetchWeather = async (query: queryParams): Promise<Weather> => {
  const weatherData = localStorage.getItem("weatherInfo");
  if (!weatherData) {
    const response = await fetch(`${BASE_URL}/weather?${formatQuery(query)}`);
    let res = await response.json();
    let weatherInfo = deStructureWeatherMap(res);
    console.log(weatherInfo);
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
