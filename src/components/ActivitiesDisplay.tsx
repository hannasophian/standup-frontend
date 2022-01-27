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
    <div key={activity.id}>
      <div className="row">
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
            <button
              className="span"
              onClick={() => setEditActivityIsOpen(true)}
            >
              Edit activity
            </button>
          )}
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
    <>
      <div className="activity-header">
        {/* <> Only shows activities Header if there are activities */}
        {(props.currentUserID === props.chairID ||
          props.activities.length !== 0) && <p>Activities</p>}
      </div>
      <div className="container">
        {props.activities.length !== 0 && activitylist}
      </div>

      {props.currentUserID === props.chairID && (
        <button onClick={() => setAddActivityIsOpen(true)}>Add activity</button>
      )}
      <ModalAddActivity
        standup={props.standup}
        addActivityIsOpen={addActivityIsOpen}
        setAddActivityIsOpen={setAddActivityIsOpen}
        setActivities={props.setActivities}
      />
    </>
  );
}
