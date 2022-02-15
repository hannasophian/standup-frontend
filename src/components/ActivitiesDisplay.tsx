import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import "../css/standupcard.css";
import { useState } from "react";
import ModalAddActivity from "./ModalAddActivity";
import StandupInterface from "../utils/interfaces/StandupInterface";
import ModalEditActivity from "./ModalEditActivity";

interface ActivitiesDisplayProps {
  currentUserID: number;
  chairID: number;
  activities: ActivitiesInterface[];
  standup: StandupInterface;
  setActivities: React.Dispatch<
    React.SetStateAction<ActivitiesInterface[] | undefined>
  >;
}

export default function ActivitiesDisplay(
  props: ActivitiesDisplayProps
): JSX.Element {
  const [addActivityIsOpen, setAddActivityIsOpen] = useState<boolean>(false);
  const [editActivityIsOpen, setEditActivityIsOpen] = useState<boolean>(false);

  const activitylist = props.activities.map((activity) => (
    <div className="single-activity" key={activity.id}>
      <div className="activity-row">
        <b key={activity.id} className="col">
          {activity.name}
        </b>
        <div className="activity-link">
          {activity.url && (
            <a href={activity.url}>
              <button>Go to Activity</button>
            </a>
          )}
        </div>
        {props.currentUserID === props.chairID && (
          <div className="edit-icon">
            <svg
              onClick={() => setEditActivityIsOpen(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil"
              viewBox="0 0 16 16"
            >
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </div>
        )}
      </div>
      <div className="row">
        {" "}
        <div className="col">
          {activity.comment && <small>"{activity.comment}"</small>}
        </div>
        <ModalEditActivity
          editActivityIsOpen={editActivityIsOpen}
          setEditActivityIsOpen={setEditActivityIsOpen}
          activity={activity}
          standup={props.standup}
          setActivities={props.setActivities}
        />
      </div>
    </div>
  ));

  return (
    <div className="activity-section">
      <div className="activity-header">
        {/* <> Only shows activities Header if there are activities */}
        {(props.currentUserID === props.chairID ||
          props.activities.length !== 0) && (
          <h4 className="card-subheader">Activities</h4>
        )}
        {props.currentUserID === props.chairID && (
          <button
            className="add-activity"
            onClick={() => setAddActivityIsOpen(true)}
          >
            Add activity
          </button>
        )}
      </div>
      <hr />
      <div className="container">
        {props.activities.length !== 0 && activitylist}
      </div>

      <ModalAddActivity
        standup={props.standup}
        addActivityIsOpen={addActivityIsOpen}
        setAddActivityIsOpen={setAddActivityIsOpen}
        setActivities={props.setActivities}
      />
    </div>
  );
}
