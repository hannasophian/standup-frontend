import { useEffect, useState } from "react";
import Modal from "react-modal";
import toStringDate from "../utils/helpers/toStringDate";
import StandupInterface from "../utils/interfaces/StandupInterface";
import "../css/standupcard.css";
import updateNotes from "../utils/fetch/updateNotes";
import fetchNextStandup from "../utils/fetch/fetchNextStandup";
import fetchPreviousStandups from "../utils/fetch/fetchPreviousStandups";

interface NotesDisplayProps {
  currentUserID: number;
  chairID: number;
  standup: StandupInterface;

  setNextStandup: React.Dispatch<
    React.SetStateAction<StandupInterface | undefined>
  >;
  setPreviousStandups: React.Dispatch<
    React.SetStateAction<StandupInterface[] | undefined>
  >;
}

export default function NotesDisplay(props: NotesDisplayProps): JSX.Element {
  const [notesInput, setNotesInput] = useState<string>();
  const [seenotesModalIsOpen, setseeNotesModalIsOpen] =
    useState<boolean>(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);

  // if there are notes, have show notes button
  const notesButton = () => {
    return (
      <button onClick={() => setseeNotesModalIsOpen(true)}>Show Notes</button>
    );
  };
  // If no notes and user = chair, have 'add notes' button
  const addNoteButton = () => {
    return <button onClick={() => setAddModalIsOpen(true)}>Add Notes</button>;
  };

  useEffect(() => {
    if (props.standup.notes !== null) {
      setNotesInput(props.standup.notes);
    }
    // eslint-disable-next-line
  }, []);

  async function handleSubmit() {
    setAddModalIsOpen(false);
    console.log(notesInput);
    await updateNotes(props.standup.id, notesInput ? notesInput : "");
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
  }

  const seeNotesModal = () => {
    return (
      <Modal
        id="see-notes-modal"
        isOpen={seenotesModalIsOpen}
        onRequestClose={() => setseeNotesModalIsOpen(false)}
        contentLabel="Notes Modal"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <div className="content">
            <h2>Notes</h2>
            <p>{toStringDate(props.standup.time)}</p>
            <p>Chair: {props.standup.chair_name}</p>
          </div>
          <button
            type="button"
            className="close"
            onClick={() => setseeNotesModalIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {props.chairID === props.currentUserID && (
            <button
              type="button"
              className="edit"
              onClick={() => {
                setseeNotesModalIsOpen(false);
                setAddModalIsOpen(true);
              }}
            >
              {" "}
              Edit
              <span aria-hidden="true">&times;</span>
            </button>
          )}
          <p>{props.standup.notes}</p>
        </div>
      </Modal>
    );
  };

  const addNotesModal = () => {
    return (
      <Modal
        id="add-notes-modal"
        isOpen={addModalIsOpen}
        onRequestClose={() => setAddModalIsOpen(false)}
        contentLabel="Add Notes Modal"
        ariaHideApp={false}
      >
        <div className="modal-header">
          <div className="content">
            <h2>Add/Update Notes</h2>
            <p>{toStringDate(props.standup.time)}</p>
            <p>Chair: {props.standup.chair_name}</p>
          </div>
          <button
            type="button"
            className="close"
            onClick={() => setAddModalIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <textarea
            id="notes-input"
            rows={7}
            placeholder="Add notes to this standup. What did you do? Are there any common problems? Were any questions? "
            onChange={(e) => setNotesInput(e.target.value)}
            value={notesInput}
          ></textarea>
          <br />
          <button onClick={handleSubmit}>OK</button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="notesdisplay">
      {props.standup.notes !== null && notesButton()}
      {props.standup.notes === null &&
        props.currentUserID === props.chairID &&
        addNoteButton()}

      {props.standup.notes !== null && seeNotesModal()}
      {addNotesModal()}
    </div>
  );
}
