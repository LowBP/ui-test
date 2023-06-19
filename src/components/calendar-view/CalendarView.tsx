import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import store from "../../store/activityStore";
import { observer } from "mobx-react";
const localizer = momentLocalizer(moment)
function CalendarView() {
    
    return (
        <Calendar
            localizer={localizer}
            events={store.allEvents}
            startAccessor="start"
            endAccessor="end"
            showMultiDayTimes
            step={60}
            defaultDate={new Date()}
            dayLayoutAlgorithm={'no-overlap'}
            defaultView="day"
        />
    )
}

export default observer(CalendarView)