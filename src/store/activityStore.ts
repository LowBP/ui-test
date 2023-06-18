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

export type ActivityEvent = {
  start?: Date;
  end?: Date;
  agendaStart?: Date;
  agendaEnd?: Date;
  title?: string;
  allDay?: boolean;
};

class ActivityStore {
  allActivities: Activity[] = [];
  currentActivity: Activity = {};
  currentWeather: Weather = {};
  currentPage: number = 0;
  totalPages: number = 1 + Number(this.allActivities.length / 10);
  allEvents: ActivityEvent[] = [];

  constructor() {
    makeAutoObservable(this);
    this.setEvents();
  }

  setAllActivities(activities: Activity[]) {
    this.allActivities = activities;
    this.setEvents();
  }

  setCurrentActivity(activity: Activity) {
    this.currentActivity = activity;
  }

  setCurrentWeather(weather: Weather) {
    this.currentWeather = weather;
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  setEvents() {
    this.allEvents = this.allActivities.map((activity) => {
      return {
        start: activity.dateTime,
        end: activity.dateTime,
        agendaStart: activity.dateTime,
        agendaEnd: activity.dateTime,
        title: `${activity.performer} ${activity.activityType} ${activity.pitch}`,
        allDay: true,
      };
    });
  }
}

const store = new ActivityStore();

export default store;
