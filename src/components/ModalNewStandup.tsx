import { useState } from "react";
import Modal from "react-modal";
import postStandup from "../utils/fetch/postStandup";
import currentDate from "../utils/helpers/currentDate";
import NewStandupInterface from "../utils/interfaces/NewStandupInterface";
import { UserInterface } from "../utils/interfaces/UserInterface";

interface ModalNewStandupProps {
  newStandupIsOpen: boolean;
  setNewStandupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  teamMembers: UserInterface[];
  teamID: number;
  currentUserID: number;
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

  const usersList = props.teamMembers.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });

  function handleSubmit() {
    if (inputDetails.time === null || inputDetails.chair_id === null) {
      window.alert("Cannot submit standup with no time or chair");
    } else {
      // console.log(inputDetails);
      postStandup({
        ...inputDetails,
        time:
          inputDetails.time[inputDetails.time.length - 1] === "Z"
            ? inputDetails.time
            : inputDetails.time + "Z",
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
        <div className="content">
          <h2>New StandUp</h2>
        </div>
        <button
          type="button"
          className="close"
          onClick={() => props.setNewStandupIsOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <section>
          <h3>New Details</h3>
          <label htmlFor="standup-time">Date and Time</label>
          <input
            type="datetime-local"
            id="standup-time"
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
          <br />
          <label htmlFor="chair-select">Chair</label>
          <select
            className="user-dropdown"
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
          <br />

          <label htmlFor="meeting-link-input">Meeting Link (Optional)</label>
          <input
            id="meeting-link-input"
            value={inputDetails.meeting_link ? inputDetails.meeting_link : ""}
            onChange={(e) =>
              setInputDetails({ ...inputDetails, meeting_link: e.target.value })
            }
          ></input>
        </section>
        <button onClick={handleSubmit}>OK</button>
      </div>
    </Modal>
  );
}
