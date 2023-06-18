import { ToastContainer } from 'react-toastify';
import { Tab } from 'semantic-ui-react';
import CalendarView from '../calendar-view/CalendarView';
import ListActivities from '../list-activities/ListActivities';

function TabContainer() {
    var userpanes = [
        {
            menuItem: { key: 'tasks', icon: 'list ul', content: 'All Tasks' },
            render: () => {
                return (
                    <Tab.Pane className='overflow-y-scroll'>
                        <ListActivities />
                    </Tab.Pane>
                )
            },
        },
        {
            menuItem: { key: 'calendar', icon: 'calendar alternate outline', content: 'Calendar' },
            render: () => {
                return (
                    <Tab.Pane className='overflow-y-scroll'>
                        <CalendarView />
                    </Tab.Pane>
                )
            },
        }
    ]
    return (
        <>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Tab
                panes={userpanes}
                className="border-radius-25"
            />
        </>

    )
}

export default TabContainer