import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import "../css/standupcard.css";

interface ActivitiesDisplayProps {
  currentUserID: number;
  chairID: number;
  activities: ActivitiesInterface[];
}

export default function ActivitiesDisplay(
  props: ActivitiesDisplayProps
): JSX.Element {
  const activitylist = props.activities.map((activity) => (
    <>
      <div key={activity.id} className="row">
        <p key={activity.id} className="col">
          {activity.name}
        </p>
        <div className="col">
          {activity.url && (
            <a href={activity.url}>
              <button>Go to Activity</button>
            </a>
          )}
        </div>
      </div>
      <div className="row">
        {" "}
        <div className="col">
          {activity.comment && <p>"{activity.comment}"</p>}
        </div>
        <div className="col">
          {props.currentUserID === props.chairID && (
            <button className="span">Edit activity</button>
          )}
        </div>
      </div>
    </>
  ));
  return (
    <>
      <div className="activity-header">
        {/* <> Only shows activities Header if there are activities */}
        {(props.currentUserID === props.chairID ||
          props.activities.length !== 0) && <p>Activities</p>}
      </div>
      <div className="container">
        {props.activities.length !== 0 && activitylist}
      </div>

      {props.currentUserID === props.chairID && <button>Add activity</button>}
    </>
  );
}
