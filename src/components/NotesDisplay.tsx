import { useEffect, useState } from "react";
import Modal from "react-modal";
import toStringDate from "../utils/helpers/toStringDate";
import StandupInterface from "../utils/interfaces/StandupInterface";
import "../css/standupcard.css"

interface NotesDisplayProps {
  currentUserID: number;
  chairID: number;
  standup: StandupInterface;
}

export default function NotesDisplay(props: NotesDisplayProps): JSX.Element {
  const [notesInput, setNotesInput] = useState<string>();
  const [seenotesModalIsOpen, setseeNotesModalIsOpen] = useState<boolean>(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState<boolean>(false);

  // if there are notes, have show notes button
  const notesButton = () => {
    return <button onClick={() => setseeNotesModalIsOpen(true)}>Show Notes</button>;
  };
  // If no notes and user = chair, have 'add notes' button
  const addNoteButton = () => {
    return <button onClick={() => setAddModalIsOpen(true)}>Add Notes</button>;
  };

  useEffect(() => {
    console.log(props.standup);
  }, [props.standup]);

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
          {props.chairID===props.currentUserID && <button
            type="button"
            className="edit"
            onClick={() => {setseeNotesModalIsOpen(false); setAddModalIsOpen(true)}}
          > Edit
            <span aria-hidden="true">&times;</span>
          </button>}
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
            placeholder="Add notes to this standup. What did you do? Are there any common problems? Were any questions raised? "
            onChange={(e) => setNotesInput(e.target.value)}>{props.standup.notes !== null && props.standup.notes}</textarea>
          <br />
          <button onClick={() => {setAddModalIsOpen(false);console.log(notesInput)}}>OK</button>
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
