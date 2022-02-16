import { useState } from "react";
import Modal from "react-modal";
import fetchFutureStandups from "../utils/fetch/fetchFutureStandups";
import fetchNextStandup from "../utils/fetch/fetchNextStandup";
import postStandup from "../utils/fetch/postStandup";
import currentDate from "../utils/helpers/currentDate";
import NewStandupInterface from "../utils/interfaces/NewStandupInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";
import { UserInterface } from "../utils/interfaces/UserInterface";

interface ModalNewStandupProps {
  newStandupIsOpen: boolean;
  setNewStandupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamMembers: UserInterface[];
  teamID: number;
  currentUserID: number;
  setNextStandup: React.Dispatch<
    React.SetStateAction<StandupInterface | undefined>
  >;
  setPreviousStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
  nextStandup: StandupInterface | undefined;
  setFutureStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
}

export default function ModalNewStandup(
  props: ModalNewStandupProps
): JSX.Element {
  const [inputDetails, setInputDetails] = useState<NewStandupInterface>({
    team_id: props.teamID,
    time: currentDate(),
    chair_id: props.currentUserID,
    meeting_link: null,
  });
  // console.log(currentDate());
  const usersList = props.teamMembers.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });

  async function handleSubmit() {
    if (inputDetails.time === null || inputDetails.chair_id === null) {
      window.alert("Cannot submit standup with no time or chair");
    } else {
      // console.log(inputDetails);
      await postStandup({
        ...inputDetails,
        time:
          inputDetails.time[inputDetails.time.length - 1] === "Z"
            ? inputDetails.time
            : inputDetails.time + "Z",
      });

      fetchNextStandup(props.teamID).then((res) =>
        props.setNextStandup(res ? res : props.nextStandup)
      );

      fetchFutureStandups(props.teamID).then((res) => {
        if (res) {
          props.setFutureStandups(res);
        }
      });

      props.setNewStandupIsOpen(false);
    }
  }

  return (
    <Modal
      id="new-standup-modal"
      isOpen={props.newStandupIsOpen}
      onRequestClose={() => props.setNewStandupIsOpen(false)}
      ariaHideApp={false}
    >
      <div className="modal-header">
        <h2>New StandUp</h2>
        <button
          type="button"
          className="close"
          onClick={() => props.setNewStandupIsOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="standup-time" className="me-2">
              Date and Time
            </label>
            <input
              type="datetime-local"
              id="standup-time"
              className="form-control"
              name=""
              onChange={(e) => {
                setInputDetails({ ...inputDetails, time: e.target.value });
                // console.log(e.target.value);
              }}
              value={
                inputDetails.time.includes("Z")
                  ? inputDetails.time.slice(0, inputDetails.time.length - 1)
                  : inputDetails.time
              }
              placeholder={inputDetails.time}
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="chair-select" className="me-2">
              Chair
            </label>
            <select
              className="form-control"
              name="chair-select"
              id="chair-select"
              value={inputDetails.chair_id}
              onChange={(e) => {
                setInputDetails({
                  ...inputDetails,
                  chair_id: parseInt(e.target.value),
                });
              }}
            >
              {usersList}
            </select>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="meeting-link-input">Meeting Link (Optional)</label>
            <input
              className="form-control"
              id="meeting-link-input"
              value={inputDetails.meeting_link ? inputDetails.meeting_link : ""}
              onChange={(e) =>
                setInputDetails({
                  ...inputDetails,
                  meeting_link: e.target.value,
                })
              }
            ></input>
          </div>
          <br />
          <button type="submit">OK</button>
        </form>
      </div>
    </Modal>
  );
}
