import { useEffect, useState } from "react";
import fetchFutureStandups from "../utils/fetch/fetchFutureStandups";
import fetchWheelURL from "../utils/fetch/fetchWheelURL";
import StandupInterface from "../utils/interfaces/StandupInterface";
import { UserInterface } from "../utils/interfaces/UserInterface";
import FutureStandups from "./FutureStandups";
import ModalNewStandup from "./ModalNewStandup";

interface SideBarProps {
  team: number;
  teamMembers: UserInterface[];
  currentUser: UserInterface;
  setNextStandup: React.Dispatch<
    React.SetStateAction<StandupInterface | undefined>
  >;
  setPreviousStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
  setFutureStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
  nextStandup: StandupInterface | undefined;
  futureStandups: StandupInterface[] | undefined;
  newStandupIsOpen: boolean;
  setNewStandupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SideBar(props: SideBarProps): JSX.Element {
  const [wheelURL, setWheelURL] = useState<string>("wheelofnames.com");

  useEffect(() => {
    fetchWheelURL(props.team).then((res) => {
      if (res) {
        setWheelURL(res);
      }
    });

    fetchFutureStandups(props.team).then((res) => {
      if (res) {
        props.setFutureStandups(res);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="row">
        <button
          onClick={() => props.setNewStandupIsOpen(true)}
          className="btn btn-primary"
        >
          New Standup
        </button>
      </div>
      <hr />
      <div className="row">
        <a href={wheelURL}>
          <button className="sidebar-button">Wheel of Names</button>
        </a>
      </div>
      <hr />
      {props.futureStandups && (
        <FutureStandups
          team_id={props.team}
          standups={props.futureStandups}
          teamMembers={props.teamMembers}
          setFutureStandups={props.setFutureStandups}
          setNextStandup={props.setNextStandup}
          setPreviousStandups={props.setPreviousStandups}
        />
      )}
      <ModalNewStandup
        setNextStandup={props.setNextStandup}
        setPreviousStandups={props.setPreviousStandups}
        newStandupIsOpen={props.newStandupIsOpen}
        setNewStandupIsOpen={props.setNewStandupIsOpen}
        teamMembers={props.teamMembers}
        teamID={props.team}
        currentUserID={props.currentUser.id}
        nextStandup={props.nextStandup}
        setFutureStandups={props.setFutureStandups}
      />
    </div>
  );
}
