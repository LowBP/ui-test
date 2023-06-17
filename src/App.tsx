import { observer } from "mobx-react";
import { useEffect } from "react";
import { fetchActivities, fetchWeather } from "./apis/activityApi";
import store from "./store/activityStore";

function App() {
  useEffect(() => {
    fetchActivities().then((data) => store.allActivities = data);
    fetchWeather().then((data) => store.currentWeather = data);
  }, []);

  return (
    <div className="App">
      Activity Scheduler
    </div>
  );
}

export default observer(App);
