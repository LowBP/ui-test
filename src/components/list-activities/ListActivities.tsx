import { Icon, Item, Pagination } from "semantic-ui-react"
import store, { Activity } from "../../store/activityStore"
import { observer } from "mobx-react";
import CustomModal, { ActivityFormValues } from "../modal/CustomModal";
import { dateTimeValue } from "../../utils/activityUtil";

function ListActivities() {
    let currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 3)
    let endDateTime = new Date();
    endDateTime.setHours(endDateTime.getHours() + 1);

    const defaults: ActivityFormValues = {
        performer: "",
        activityType: "",
        pitch: "",
        startDateTime: currentDate.toISOString(),
        endDateTime: endDateTime.toISOString(),
    }

    const convertActivity = (activity: Activity) => {
        return {
            performer: activity.performer,
            activityType: activity.activityType,
            pitch: activity.pitch,
            startDateTime: activity.startDateTime
        } as ActivityFormValues
    }

    const prepareForEdit = (activity: Activity) => {
        store.setCurrentActivity(activity);
        store.toggleEditActivityModal(true);
    }

    const taskStatus = (activity: Activity) => {
        const { endDateTime, startDateTime } = activity;
        if (new Date() > new Date(endDateTime!)) {
            return (<div className="text-green-600 font text-base text-right">{'Completed!'}</div>)
        }

        if (new Date() < new Date(startDateTime!)) {
            return (<div className="text-grey-600 font text-base text-right">{'Pending!'}</div>)
        }

        return (<div className="text-green-600 font text-base text-right">{'On Going!'}</div>)

    }

    return (
        <>
            <CustomModal
                view="add"
                showModal={store.addActivityModal}
                defaults={defaults}
                toggleModal={store.toggleAddActivityModal}
            />
            <CustomModal
                view="edit"
                showModal={store.editActivityModal}
                defaults={convertActivity(store.currentActivity)}
                toggleModal={store.toggleEditActivityModal}
            />
            <div className="mx-auto w-1/2 grid">
                <button
                    className="btn btn-secondary bg-gradient-to-br from-cyan-500 to-blue-700"
                    onClick={() => store.toggleAddActivityModal(true)}
                >Add an Activity </button>
                <Item.Group className="mt-0">
                    {
                        store.allActivities?.slice().reverse().map(activity => {
                            let startDate = activity.startDateTime ? new Date(activity.startDateTime) : new Date()
                            let endDate = activity.endDateTime ? new Date(activity.endDateTime) : new Date()
                            return (
                                <Item
                                    className="activity-container"
                                    key={activity.id}
                                    onClick={() => prepareForEdit(activity)}
                                >
                                    <Item.Content>
                                        <Item.Header>{activity.activityType}</Item.Header>
                                        <Item.Meta>
                                            <div>{activity.performer}</div>
                                            <div><b>{activity.pitch}</b></div>
                                        </Item.Meta>
                                        <Item.Extra>
                                            <div className="row-justify">
                                                <b> {dateTimeValue(startDate)}  --  {dateTimeValue(endDate)} </b>
                                            </div>
                                        </Item.Extra>
                                        <Item.Extra>
                                            <div>{taskStatus(activity)}</div>
                                        </Item.Extra>

                                    </Item.Content>
                                </Item>
                            )
                        })
                    }
                </Item.Group>
                {store.allActivities?.length > 0 &&
                    <Pagination
                        className="sticky-bottom w-full justify-center flex"
                        activePage={store.currentPage}
                        ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                        firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                        lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                        prevItem={{ content: <Icon name='angle left' />, icon: true }}
                        nextItem={{ content: <Icon name='angle right' />, icon: true }}
                        totalPages={store.totalPages}
                        onPageChange={(e, data) => store.setPage(data.activePage as number)}
                    />}
            </div>
        </>
    )
}

export default observer(ListActivities)