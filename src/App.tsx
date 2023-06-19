import "react-big-calendar/lib/css/react-big-calendar.css";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { fetchActivities, fetchWeather } from "./apis/activityApi";
import store from "./store/activityStore";
import WeatherSummary from "./components/weather-summary/WeatherSummary";
import TabContainer from "./components/tab-container/TabContainer";
import { Spinner } from 'react-bootstrap';
function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let units = "metric";
      await store.setAllActivities(await fetchActivities());
      await store.setCurrentWeather(await fetchWeather({ lat, lon, units }));
      setLoading(false);
    });

  }, []);

  return (
    <div className="">
      {isLoading ? <div className="flex flex-col h-screen justify-center items-center"><Spinner /></div> :
        <>
          <WeatherSummary weather={store.currentWeather} />
          <TabContainer />
        </>}
    </div>
  );
}

export default observer(App);
