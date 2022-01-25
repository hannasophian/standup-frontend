import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";

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
      {activity.url && <a href={activity.url}>Go to activity</a>}
      {activity.comment && <p>"{activity.comment}"</p>}
    </div>
  ));
  return (
    <>
      {(props.currentUserID === props.chairID ||
        props.activities.length !== 0) && <h3>Activities</h3>}
      {props.activities.length !== 0 && activitylist}
      {props.currentUserID === props.chairID && <button>Add activity</button>}
    </>
  );
}
