import { useState } from "react";
import Modal from "react-modal";
import fetchFutureStandups from "../utils/fetch/fetchFutureStandups";
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
  setFutureStandups: React.Dispatch<
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
      fetchFutureStandups(props.standup.team_id).then((res) => {
        if (res) {
          props.setFutureStandups(res);
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
        <h2>Edit StandUp</h2>
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
        <br />
        <section className="new-details">
          <h3>New Details</h3>
          <form>
            <div className="form-group">
              <label htmlFor="standuptime">New Date and Time:</label>
              <input
                className="form-control"
                type="datetime-local"
                id="standuptime"
                name=""
                onChange={(e) => {
                  setInputDetails({ ...inputDetails, time: e.target.value });
                }}
                value={
                  inputDetails.time.includes("Z")
                    ? inputDetails.time.slice(0, inputDetails.time.length - 1)
                    : inputDetails.time
                }
              />
            </div>
            <br />

            <div className="form-group">
              <label htmlFor="chair-select">Chair</label>
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
              <label htmlFor="meeting-link-input">
                Meeting Link (Optional)
              </label>
              <input
                id="meeting-link-input"
                className="form-control"
                value={inputDetails.meeting_link}
                onChange={(e) =>
                  setInputDetails({
                    ...inputDetails,
                    meeting_link: e.target.value,
                  })
                }
              ></input>
            </div>
          </form>
        </section>
        <br />
        <button onClick={handleSubmit}>OK</button>
      </div>
    </Modal>
  );
}
