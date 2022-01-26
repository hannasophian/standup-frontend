import { useState } from "react";
import Modal from "react-modal";
import postActivity from "../utils/fetch/postActivity";
import toStringDate from "../utils/helpers/toStringDate";
import InputActivityInterface from "../utils/interfaces/InputActivityInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface AddActivityProps {
  addActivityIsOpen: boolean;
  setAddActivityIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  standup: StandupInterface;
}

export default function ModalAddActivity(props: AddActivityProps): JSX.Element {
  const initialInputActivity = {
    standup_id: props.standup.id,
    user_id: props.standup.chair_id,
    name: null,
    url: null,
    comment: null,
  };
  const [inputActivity, setInputActivity] =
    useState<InputActivityInterface>(initialInputActivity);

  function handleSubmit() {
    if (inputActivity.name === null || inputActivity.name === "") {
      window.alert("Cannot submit activity with no title");
    } else {
      console.log(inputActivity);
      postActivity(inputActivity);
      props.setAddActivityIsOpen(false);
      setInputActivity(initialInputActivity);
    }
  }
  return (
    <Modal
      id="add-notes-modal"
      isOpen={props.addActivityIsOpen}
      onRequestClose={() => props.setAddActivityIsOpen(false)}
      contentLabel="Add Notes Modal"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <div className="content">
          <h2>Add Activity</h2>
          <p>{toStringDate(props.standup.time)}</p>
          {/* <p>Chair: {props.standup.chair_name}</p> */}
        </div>
        <button
          type="button"
          className="close"
          onClick={() => props.setAddActivityIsOpen(false)}
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
