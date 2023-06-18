import { Icon, Item, Pagination } from "semantic-ui-react"
import store from "../../store/activityStore"

function ListActivities() {
    const dateFormat: Intl.DateTimeFormatOptions = { minute: 'numeric', hour: 'numeric', day: '2-digit', month: '2-digit', year: 'numeric' };
    return (
        <div className="mx-auto w-1/2">
            <Item.Group className="mt-0">
                {
                    store.allActivities?.map(activity => {
                        return (
                            <Item
                                className="activity-container"
                                key={activity.id}
                                onClick={() => console.log(activity)}
                            >
                                <Item.Content>
                                    <Item.Header>{activity.activityType}</Item.Header>
                                    <Item.Meta>
                                        <div>{activity.performer}</div>
                                        <div><b>{activity.pitch}</b></div>
                                    </Item.Meta>
                                    <Item.Extra>
                                        <div className="row-justify">
                                            {activity.dateTime?.toLocaleDateString("en-IN", dateFormat)}
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
    )
}

export default ListActivities