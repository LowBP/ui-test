import { makeAutoObservable } from "mobx";
import { dateTimeValue } from "../utils/activityUtil";

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
  activityType?: string;
  startDateTime?: string;
  endDateTime?: string;
  performer?: string;
  pitch?: string;
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
  addActivityModal: boolean = false;
  editActivityModal: boolean = false;
  deleteActivityModal: boolean = false;

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

  toggleAddActivityModal(flag: boolean) {
    this.addActivityModal = flag;
  }

  toggleEditActivityModal(flag: boolean) {
    this.editActivityModal = flag;
  }

  toggleDeleteActivityModal(flag: boolean) {
    this.deleteActivityModal = flag;
  }

  setEvents() {
    this.allEvents = this.allActivities.map((activity) => {
      return {
        start: activity.startDateTime ? new Date(activity.startDateTime) : new Date(),
        end: activity.startDateTime ? new Date(activity.startDateTime) : new Date(),
        agendaStart: activity.startDateTime ? new Date(activity.startDateTime) : new Date(),
        agendaEnd: activity.startDateTime ? new Date(activity.startDateTime) : new Date(),
        title: `${activity.performer} ${activity.activityType} ${activity.pitch}`,
        allDay: true,
      };
    });
  }

  async createActivity(newActivity: Activity) {
    let id = crypto.randomUUID();
    newActivity.id = id;
    let newActivities: Activity[] = [...this.allActivities, newActivity];
    this.setAllActivities(newActivities);
    localStorage.setItem("activities", JSON.stringify(newActivities));
    this.setEvents();
    return id;
  }

  updateActivity(activity: Activity) {
    let oldActivityIndex = this.allActivities.findIndex((item) => (item.id = this.currentActivity?.id));
    if (oldActivityIndex > -1) {
      Object.assign(this.allActivities[oldActivityIndex], activity);
      localStorage.setItem("activities", JSON.stringify(this.allActivities));
      this.setCurrentActivity({});
      this.setEvents();
      return this.allActivities[oldActivityIndex].id;
    } else {
      return;
    }
  }

  matchingBusyActivities(activity: Activity) {
    const performers: Activity[] = this.allActivities?.filter(a=> a.performer === activity.performer)?.filter(a=>(new Date(dateTimeValue(a.startDateTime!)) <= new Date(dateTimeValue(activity.endDateTime!)) && new Date(dateTimeValue(a.endDateTime!)) >= new Date(dateTimeValue(activity.startDateTime!))))
    const removedPerformers  = performers.length ? this.allActivities?.filter(a=> performers.findIndex(performer=> performer.id === a.id ) === -1) : this.allActivities
    const pitches = removedPerformers.filter(a=> a.pitch === activity.pitch)?.filter(a=> (new Date(dateTimeValue(a.startDateTime!)) <= new Date(dateTimeValue(activity.endDateTime!)) && new Date(dateTimeValue(a.endDateTime!)) >= new Date(dateTimeValue(activity.startDateTime!))))
   return pitches;
  }

  removeCurrentActivity() {
    let removeId = this.currentActivity.id;
    let updatedActivities = this.allActivities.filter((item) => item.id !== removeId);
    this.setAllActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
    this.setCurrentActivity({});
    this.setEvents();
    return removeId;
  }
}

const store = new ActivityStore();

export default store;
