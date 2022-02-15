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
      <div className="card">
        <div className="card-header">
          {/* Date display */}
          <div className="d-inline-block">
            <h3 className="card-title">{toStringDate(props.standup.time)}</h3>
          </div>
          {/* Edit icon only when user = chair */}
          {props.currentUserID === props.standup.chair_id && (
            <span className="d-inline-block btn float-right">
              <svg
                onClick={() => setEditStandupIsOpen(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </span>
          )}

          {props.standup.meeting_link && (
            // <span className="d-inline-block">
            <div className="meeting-link">
              <a href={props.standup.meeting_link}>
                <button>Go to meeting</button>
              </a>
            </div>
            // </span>
          )}
        </div>

        <div className="card-body">
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
            <p>Chair: {props.standup.chair_name}</p>
          </span>

          {activities &&
            (activities.length !== 0 ||
              props.standup.chair_id === props.currentUserID) && (
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
      </div>
    </div>
  );
}
