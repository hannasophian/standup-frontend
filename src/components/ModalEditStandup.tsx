import { useState } from "react";
import Modal from "react-modal";
import fetchNextStandup from "../utils/fetch/fetchNextStandup";
import fetchPreviousStandups from "../utils/fetch/fetchPreviousStandups";
import updateStandup from "../utils/fetch/updateStandup";
// import updateActivity from "../utils/fetch/updateActivity";
import toStringDate from "../utils/helpers/toStringDate";
// import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import InputStandUpInterface from "../utils/interfaces/InputStandup";
import StandupInterface from "../utils/interfaces/StandupInterface";
import { UserInterface } from "../utils/interfaces/UserInterface";

interface EditStandupProps {
  editStandupIsOpen: boolean;
  setEditStandupIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  standup: StandupInterface;
  teamMembers: UserInterface[];
  setNextStandup: React.Dispatch<
    React.SetStateAction<StandupInterface | undefined>
  >;
  setPreviousStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
}

export default function ModalEditStandup(props: EditStandupProps): JSX.Element {
  const [inputDetails, setInputDetails] = useState<InputStandUpInterface>({
    id: props.standup.id,
    time: props.standup.time,
    chair_id: props.standup.chair_id,
    meeting_link: props.standup.meeting_link ? props.standup.meeting_link : "",
  });

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
      console.log(inputDetails);
      await updateStandup({
        ...inputDetails,
        time:
          inputDetails.time[inputDetails.time.length - 1] === "Z"
            ? inputDetails.time
            : inputDetails.time + "Z",
      });
      fetchNextStandup(props.standup.team_id).then((res) => {
        if (res) {
          props.setNextStandup(res);
        }
      });
      fetchPreviousStandups(props.standup.team_id).then((res) => {
        if (res) {
          props.setPreviousStandups(res);
        }
      });

      props.setEditStandupIsOpen(false);
    }
  }
  return (
    <Modal
      id="edit-notes-modal"
      isOpen={props.editStandupIsOpen}
      onRequestClose={() => props.setEditStandupIsOpen(false)}
      contentLabel="Edit Notes Modal"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <div className="content">
          <h2>Edit StandUp</h2>
        </div>
        <button
          type="button"
          className="close"
          onClick={() => props.setEditStandupIsOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <section className="current-details">
          <h3>Current Details</h3>
          <p>Date and Time: {toStringDate(props.standup.time)}</p>
          <p>Chair: {props.standup.chair_name}</p>
        </section>
        <section>
          <h3>New Details</h3>
          <label htmlFor="standuptime">New Date and Time:</label>
          <input
            type="datetime-local"
            id="standuptime"
            name=""
            onChange={(e) => {
              setInputDetails({ ...inputDetails, time: e.target.value });
              console.log(e.target.value);
            }}
            value={
              inputDetails.time.includes("Z")
                ? inputDetails.time.slice(0, inputDetails.time.length - 1)
                : inputDetails.time
            }
            // placeholder={inputDetails.time}
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
            value={inputDetails.meeting_link}
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
