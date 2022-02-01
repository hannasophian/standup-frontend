import { useEffect, useState } from "react";
import fetchActivities from "../utils/fetch/fetchActivities";
import toStringDate from "../utils/helpers/toStringDate";
import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";
import { UserInterface } from "../utils/interfaces/UserInterface";
import ActivitiesDisplay from "./ActivitiesDisplay";
import ModalEditStandup from "./ModalEditStandup";
import NotesDisplay from "./NotesDisplay";

export default function StandupCard(props: {
  standup: StandupInterface;
  currentUserID: number;
  teamMembers: UserInterface[];
  setNextStandup: React.Dispatch<
    React.SetStateAction<StandupInterface | undefined>
  >;
  setPreviousStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
  setFutureStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
}): JSX.Element {
  const [activities, setActivities] = useState<ActivitiesInterface[]>();
  const [editStandupIsOpen, setEditStandupIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchActivities(props.standup.id).then((res) => {
      if (res) setActivities(res);
    });
  }, [props.standup.id]);

  return (
    <div className="standupcard">
      <div className="card-header">
        <div className="title">
          <h3>{toStringDate(props.standup.time)}</h3>
        </div>
        {props.currentUserID === props.standup.chair_id && (
          <button
            className="edit-button"
            onClick={() => setEditStandupIsOpen(true)}
          >
            Edit
          </button>
        )}
      </div>
      <span className="d-inline-block btn float-left">
        <img
          className="user-photo"
          src={
            props.standup.chair_image
              ? props.standup.chair_image
              : "images/user.png"
          }
          alt={props.standup.chair_name}
        />
      </span>
      <span className="d-inline-block">
        <p>Chaired by: {props.standup.chair_name}</p>
      </span>

      {/* <p>Chaired by: {props.standup.chair_name}</p> */}
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
          standup={props.standup}
          setActivities={setActivities}
        />
      )}

      <NotesDisplay
        setNextStandup={props.setNextStandup}
        setPreviousStandups={props.setPreviousStandups}
        currentUserID={props.currentUserID}
        chairID={props.standup.chair_id}
        standup={props.standup}
      />

      <ModalEditStandup
        editStandupIsOpen={editStandupIsOpen}
        setEditStandupIsOpen={setEditStandupIsOpen}
        standup={props.standup}
        teamMembers={props.teamMembers}
        setNextStandup={props.setNextStandup}
        setPreviousStandups={props.setPreviousStandups}
        setFutureStandups={props.setFutureStandups}
      />
    </div>
  );
}
