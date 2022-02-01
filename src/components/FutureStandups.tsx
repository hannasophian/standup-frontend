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
      <div className="future-standup-card" key={standup.id}>
        <div className="container">
          <div className="row">
            <p>{toStringDate(standup.time)}</p>
          </div>
          <div className="row">
            <div className="col">
              <span className="d-inline-block btn float-left">
                <img
                  className="user-photo"
                  src={
                    standup.chair_image
                      ? standup.chair_image
                      : "images/user.png"
                  }
                  alt={standup.chair_name}
                />
              </span>
              <span className="d-inline-block">
                <p>{standup.chair_name}</p>
              </span>
            </div>
            <div className="col">
              <button onClick={() => setModalIsOpen(true)}>Edit</button>
            </div>
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
