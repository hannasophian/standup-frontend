import StandupInterface from "../utils/interfaces/StandupInterface";

export default function StandupCard(props: {
  standup: StandupInterface;
  currentUserID: number;
}): JSX.Element {
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
      {/* If there are no acti */}

      {props.currentUserID === props.standup.chair_id && (
        <button>Edit Notes</button>
      )}
    </div>
  );
}
