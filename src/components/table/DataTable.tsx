import Table from 'react-bootstrap/Table';
import { Activity } from '../../store/activityStore';
import { dateTimeValue } from '../../utils/activityUtil';
type Props = {
  rows: Activity[]
}
function DataTable({rows}: Props ) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Start - End Time</th>
          <th>Activity Type</th>
          <th>Performer</th>
          <th>Pitch</th>
        </tr>
      </thead>
      <tbody>
        {rows?.map(r=>{
          return (<tr>
            <td>{ dateTimeValue(r.startDateTime!)} -- {dateTimeValue(r.endDateTime!)}</td>
            <td>{r.activityType}</td>
            <td>{r.performer}</td>
            <td>{r.pitch}</td>
          </tr>)
        })}
      </tbody>
    </Table>
  );
}

export default DataTable;