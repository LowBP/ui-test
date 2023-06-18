import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment';
import store from "../../store/activityStore";
import { observer } from "mobx-react";

const localizer = momentLocalizer(moment)
function CalendarView() {
    const customEventPropGetter = () => {
        return {
            style: {
                backgroundColor: 'green',
                borderRadius: '5px',
                opacity: 4,
                color: 'white',
                border: '0px',
                display: 'block',
                height: '45px',
                transform: 'translateY(-45px)'
            }
        }
    }
    return (
        <Calendar
            localizer={localizer}
            events={store.allEvents}
            startAccessor="start"
            endAccessor="end"
            views={
                { month: true }
            }
            eventPropGetter={customEventPropGetter}
        />
    )
}

export default observer(CalendarView)