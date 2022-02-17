import { useState } from "react";
import Modal from "react-modal";
import fetchActivities from "../utils/fetch/fetchActivities";
import updateActivity from "../utils/fetch/updateActivity";
import toStringDate from "../utils/helpers/toStringDate";
import ActivitiesInterface from "../utils/interfaces/ActivitiesInterface";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface EditActivityProps {
  editActivityIsOpen: boolean;
  setEditActivityIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activity: ActivitiesInterface;
  standup: StandupInterface;
  setActivities: React.Dispatch<
    React.SetStateAction<ActivitiesInterface[] | undefined>
  >;
}

export default function ModalEditActivity(
  props: EditActivityProps
): JSX.Element {
  const [inputActivity, setInputActivity] = useState<ActivitiesInterface>(
    props.activity
  );

  // console.log(props.activity)

  async function handleSubmit() {
    if (inputActivity.name === null || inputActivity.name === "") {
      window.alert("Cannot submit activity with no title");
    } else {
      // console.log(inputActivity);
      props.setEditActivityIsOpen(false);

      await updateActivity(inputActivity);
      fetchActivities(props.standup.id).then((res) => {
        if (res) {
          props.setActivities(res);
        }
      });
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
        <div className="row">
          <h2>Edit Activity</h2>
          <p>{toStringDate(props.standup.time)}</p>
        </div>
        <div className="row">
          <button
            type="button"
            className="close"
            onClick={() => props.setEditActivityIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name-input">Title*</label>
            <input
              id="name-input"
              className="form-control"
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
