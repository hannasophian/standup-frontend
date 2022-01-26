import { useState } from "react";
import Modal from "react-modal";
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
}

export default function ModalEditStandup(props: EditStandupProps): JSX.Element {
  const [inputDetails, setInputDetails] = useState<InputStandUpInterface>({
    time: props.standup.time,
    chair_id: props.standup.chair_id,
  });

  const usersList = props.teamMembers.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });

  //   function handleSubmit() {
  //     if (inputActivity.name === null || inputActivity.name === "") {
  //       window.alert("Cannot submit activity with no title");
  //     } else {
  //       console.log(inputActivity);
  //       updateActivity(inputActivity);
  //       props.setEditActivityIsOpen(false);
  //     }
  //   }
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
            onChange={(e) => console.log(typeof e.target.value)}
            placeholder={inputDetails.time}
          />
          <br />
          <label htmlFor="chair-select">Select chair</label>
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
        </section>
        <button>OK</button>
      </div>
    </Modal>
  );
}
