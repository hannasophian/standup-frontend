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
    <div key={activity.id} className="activity">
      <p key={activity.id}>{activity.name}</p>
      <div>
        {activity.url && (
          <a href={activity.url}>
            <p>Go to activity</p>
          </a>
        )}
      </div>
      <div>{activity.comment && <p>"{activity.comment}"</p>}</div>
    </div>
  ));
  return (
    <>
      <div className="activity-header">
        <>
          {(props.currentUserID === props.chairID ||
            props.activities.length !== 0) && <p>Activities</p>}
        </>
        {props.currentUserID === props.chairID && <button>Add activity</button>}
        <></>
      </div>
      {props.activities.length !== 0 && activitylist}
    </>
  );
}
