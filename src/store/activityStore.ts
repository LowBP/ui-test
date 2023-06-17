import { makeAutoObservable } from "mobx";

export enum ACTIVITY_TYPE {
  MOWING = "Mowing",
  FERTILISATION = "Fertilisation",
  IRRIGATION = "Irrigation",
  AERATION = "Aeration",
}

export enum PERFORMER {
  TOM = "Tom",
  JOHN = "John",
  TONY = "Tony",
}

export enum PITCH {
  PITCH_1 = "Pitch 1",
  PITCH_2 = "Pitch 2",
  PITCH_3 = "Pitch 3",
}

export type Activity = {
  id?: string;
  activityType?: ACTIVITY_TYPE;
  dateTime?: Date;
  performer?: PERFORMER;
  pitch?: PITCH;
};

export type Weather = {
  temp?: number;
  feels_like?: number;
  temp_min?: number;
  temp_max?: number;
  humidity?: number;
  dt?: number;
  name?: string;
  icon?: string;
  details?: string;
  timezone?: number;
};

class ActivityStore {
  allActivities: Activity[] = [];
  currentActivity: Activity = {};
  currentWeather: Weather = {};

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentActivity(activity: Activity) {
    this.currentActivity = activity;
  }

  setCurrentWeather(weather: Weather) {
    this.currentWeather = weather;
  }
}

const store = new ActivityStore();

export default store;
