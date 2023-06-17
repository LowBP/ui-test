import { observer } from "mobx-react";
import { useEffect } from "react";
import { fetchActivities, fetchWeather } from "./apis/activityApi";
import store from "./store/activityStore";
import WeatherSummary from "./components/weather-summary/WeatherSummary";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let units = "metric";
      fetchActivities().then((data) => store.allActivities = data);
      fetchWeather({ lat, lon, units }).then((data) => { store.setCurrentWeather(data) });
    });

  }, []);

  return (
    <div>
      <WeatherSummary weather={store.currentWeather} />
    </div>
  );
}

export default observer(App);
