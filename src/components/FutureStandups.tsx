// import { useEffect, useState } from "react";
// import fetchPreviousStandups from "../utils/fetch/fetchPreviousStandups";
import { useState } from "react";
import toStringDate from "../utils/helpers/toStringDate";
import StandupInterface from "../utils/interfaces/StandupInterface";
import { UserInterface } from "../utils/interfaces/UserInterface";
import ModalEditStandup from "./ModalEditStandup";

interface FutureStandupsProps {
  team_id: number;
  standups: StandupInterface[];
  teamMembers: UserInterface[];
  setFutureStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
  setNextStandup: React.Dispatch<
    React.SetStateAction<StandupInterface | undefined>
  >;
  setPreviousStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
}

export default function FutureStandups(
  props: FutureStandupsProps
): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const standupCards = props.standups.map((standup) => {
    return (
      <div className="card" key={standup.id}>
        <div className="card-header">
          <p>{toStringDate(standup.time)}</p>
        </div>
        <div className="container p-2">
          {/* <div className="me-auto"> */}
          <span className="d-inline-block float-left">
            <img
              className="user-photo"
              src={
                standup.chair_image ? standup.chair_image : "images/user.png"
              }
              alt={standup.chair_name}
            />
          </span>
          <span className="d-inline-block">
            <p>{standup.chair_name}</p>
          </span>
          {/* </div> */}
          <div className="d-inline-block btn float-right">
            <svg
              onClick={() => setModalIsOpen(true)}
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
        </div>
        <ModalEditStandup
          editStandupIsOpen={modalIsOpen}
          setEditStandupIsOpen={setModalIsOpen}
          standup={standup}
          teamMembers={props.teamMembers}
          setNextStandup={props.setNextStandup}
          setFutureStandups={props.setFutureStandups}
          setPreviousStandups={props.setPreviousStandups}
        />
      </div>
    );
  });

  return (
    <div className="future-standups">
      <h3>Future Standups</h3>
      {standupCards}
    </div>
  );
}
