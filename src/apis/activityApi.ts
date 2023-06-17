import { Activity, Weather } from "../store/activityStore";

// TO-DO functions that will read or write to local storage, mocking REST API
const fetchWeather = async (): Promise<Weather> => {
  return {} as Weather;
};

const fetchActivities = async (): Promise<Activity[]> => {
  return [] as Activity[];
};

export { fetchWeather, fetchActivities };
