import { useState } from "react";
import Modal from "react-modal";
import fetchActivities from "../utils/fetch/fetchActivities";
import postActivity from "../utils/fetch/postActivity";
import toStringDate from "../utils/helpers/toStringDate";
import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import InputActivityInterface from "../utils/interfaces/InputActivityInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface AddActivityProps {
  addActivityIsOpen: boolean;
  setAddActivityIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  standup: StandupInterface;
  setActivities: React.Dispatch<
    React.SetStateAction<ActivitiesInterface[] | undefined>
  >;
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

  async function handleSubmit() {
    if (inputActivity.name === null || inputActivity.name === "") {
      window.alert("Cannot submit activity with no title");
    } else {
      // console.log(inputActivity);
      props.setAddActivityIsOpen(false);
      await postActivity(inputActivity);
      fetchActivities(props.standup.id).then((res) => {
        if (res) {
          props.setActivities(res);
        }
      });
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
        <div className="row">
          <h2>Add Activity</h2>
          <p>{toStringDate(props.standup.time)}</p>
        </div>
        <div className="row">
          <button
            type="button"
            className="close"
            onClick={() => props.setAddActivityIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      {/* </div> */}
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name-input">Title*</label>
            <input
              className="form-control"
              id="name-input"
              value={inputActivity.name ? inputActivity.name : ""}
              onChange={(e) =>
                setInputActivity({ ...inputActivity, name: e.target.value })
              }
            ></input>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="url-input">URL</label>
            <input
              id="url-input"
              className="form-control"
              placeholder="Optional"
              value={inputActivity.url ? inputActivity.url : ""}
              onChange={(e) =>
                setInputActivity({ ...inputActivity, url: e.target.value })
              }
            ></input>
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="message-input">Comment</label>
            <textarea
              id="message-input"
              className="form-control"
              rows={2}
              placeholder="Optional: game passwords, instructions for the activity, short description"
              value={inputActivity.comment ? inputActivity.comment : ""}
              onChange={(e) =>
                setInputActivity({ ...inputActivity, comment: e.target.value })
              }
            ></textarea>
          </div>
          <br />
          <button type="submit">OK</button>
        </form>
      </div>
    </Modal>
  );
}
