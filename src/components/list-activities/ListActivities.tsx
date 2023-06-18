import { Icon, Item, Pagination } from "semantic-ui-react"
import store, { Activity } from "../../store/activityStore"
import { observer } from "mobx-react";
import CustomModal, { ActivityFormValues } from "../modal/CustomModal";

function ListActivities() {
    const dateFormat: Intl.DateTimeFormatOptions = { minute: 'numeric', hour: 'numeric', day: '2-digit', month: '2-digit', year: 'numeric' };

    const defaults: ActivityFormValues = {
        performer: "",
        activityType: "",
        pitch: "",
        dateTime: new Date().toISOString(),
    }

    const convertActivity = (activity: Activity) => {
        return {
            performer: activity.performer,
            activityType: activity.activityType,
            pitch: activity.pitch,
            dateTime: activity.dateTime
        } as ActivityFormValues
    }

    const prepareForEdit = (activity: Activity) => {
        store.setCurrentActivity(activity);
        store.toggleEditActivityModal(true);
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
                        store.allActivities?.map(activity => {
                            let date = activity.dateTime ? new Date(activity.dateTime) : new Date()
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
                                                {date.toLocaleDateString("en-IN", dateFormat)}
                                            </div>
                                        </Item.Extra>
                                    </Item.Content>
                                </Item>
                            )
                        })
                    }
                </Item.Group>
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
                />
            </div>
        </>
    )
}

export default observer(ListActivities)