import { queryParams } from "../apis/activityApi";

const APIKey = process.env.REACT_APP_WEATHER_API_KEY;

export const formatQuery = (query: queryParams) => {
  if(!APIKey) alert('please add REACT_APP_WEATHER_API_KEY to .env.local file!')
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

export const dateTimeFromat: Intl.DateTimeFormatOptions = { minute: 'numeric', hour: 'numeric', day: '2-digit', month: '2-digit', year: 'numeric' };
export const dateTimeValue = (dateTime: string | Date) => (new Date(dateTime).toLocaleDateString("de-DE", dateTimeFromat));
