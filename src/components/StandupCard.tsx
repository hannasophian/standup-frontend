import { useEffect, useState } from "react";
import fetchActivities from "../utils/fetch/fetchActivities";
import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";
import ActivitiesDisplay from "./ActivitiesDisplay";
import NotesDisplay from "./NotesDisplay";

export default function StandupCard(props: {
  standup: StandupInterface;
  currentUserID: number;
}): JSX.Element {
  const [activities, setActivities] = useState<ActivitiesInterface[]>();

  useEffect(() => {
    fetchActivities(props.standup.id).then((res) => {
      if (res) setActivities(res);
    });
  }, [props.standup.id]);

  return (
    <div className="standupcard">
      <h3>{props.standup.time}</h3>
      {props.currentUserID === props.standup.chair_id && <button>Edit</button>}
      <p>Chaired by: {props.standup.chair_name}</p>
      {props.standup.meeting_link && (
        <p>
          Meeting Link:{" "}
          <a href="props.standup.meeting_link">{props.standup.meeting_link}</a>
        </p>
      )}

      {/* //Section for activities */}
      {/* If there are no activities */}
      {activities && (
        <ActivitiesDisplay
          currentUserID={props.currentUserID}
          chairID={props.standup.chair_id}
          activities={activities}
        />
      )}

      <NotesDisplay
        currentUserID={props.currentUserID}
        chairID={props.standup.chair_id}
        standup={props.standup}
      />
    </div>
  );
}
