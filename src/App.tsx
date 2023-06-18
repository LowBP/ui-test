import "react-big-calendar/lib/css/react-big-calendar.css";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { fetchActivities, fetchWeather } from "./apis/activityApi";
import store from "./store/activityStore";
import WeatherSummary from "./components/weather-summary/WeatherSummary";
import TabContainer from "./components/tab-container/TabContainer";

function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let units = "metric";
      fetchActivities().then((data) => store.setAllActivities(data));
      fetchWeather({ lat, lon, units }).then((data) => { store.setCurrentWeather(data) });
    });

  }, []);

  return (
    <div>
      <WeatherSummary weather={store.currentWeather} />
      <TabContainer />
    </div>
  );
}

export default observer(App);
