import { useState } from "react";
import Modal from "react-modal";
import updateActivity from "../utils/fetch/updateActivity";
import toStringDate from "../utils/helpers/toStringDate";
import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface EditActivityProps {
  editActivityIsOpen: boolean;
  setEditActivityIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activity: ActivitiesInterface;
  standup: StandupInterface;
}

export default function ModalEditActivity(
  props: EditActivityProps
): JSX.Element {
  const [inputActivity, setInputActivity] = useState<ActivitiesInterface>(
    props.activity
  );

  function handleSubmit() {
    if (inputActivity.name === null || inputActivity.name === "") {
      window.alert("Cannot submit activity with no title");
    } else {
      console.log(inputActivity);
      updateActivity(inputActivity);
      props.setEditActivityIsOpen(false);
    }
  }
  return (
    <Modal
      id="edit-notes-modal"
      isOpen={props.editActivityIsOpen}
      onRequestClose={() => props.setEditActivityIsOpen(false)}
      contentLabel="Edit Notes Modal"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <div className="content">
          <h2>Edit Activity</h2>
          <p>{toStringDate(props.standup.time)}</p>
          {/* <p>Chair: {props.standup.chair_name}</p> */}
        </div>
        <button
          type="button"
          className="close"
          onClick={() => props.setEditActivityIsOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <label htmlFor="name-input">Title*</label>
        <input
          id="name-input"
          value={inputActivity.name ? inputActivity.name : ""}
          onChange={(e) =>
            setInputActivity({ ...inputActivity, name: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="url-input">URL</label>
        <input
          id="url-input"
          placeholder="Optional"
          value={inputActivity.url ? inputActivity.url : ""}
          onChange={(e) =>
            setInputActivity({ ...inputActivity, url: e.target.value })
          }
        ></input>
        <br />
        <label htmlFor="message-input">Comment</label>
        <textarea
          id="message-input"
          rows={2}
          placeholder="Optional: game passwords, instructions for the activity, short description"
          value={inputActivity.comment ? inputActivity.comment : ""}
          onChange={(e) =>
            setInputActivity({ ...inputActivity, comment: e.target.value })
          }
        ></textarea>
        <br />
        <button onClick={handleSubmit}>OK</button>
      </div>
    </Modal>
  );
}
