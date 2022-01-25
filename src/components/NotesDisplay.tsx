import { useEffect, useState } from "react";
import Modal from "react-modal";
import toStringDate from "../utils/helpers/toStringDate";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface NotesDisplayProps {
  currentUserID: number;
  chairID: number;
  standup: StandupInterface;
}

export default function NotesDisplay(props: NotesDisplayProps): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  // if there are notes, have show notes button
  const notesButton = () => {
    return <button onClick={() => setModalIsOpen(true)}>Show Notes</button>;
  };
  // If no notes and user = chair, have 'add notes' button
  const addNoteButton = () => {
    return <button>Add Notes</button>;
  };

  useEffect(() => {
    console.log(props.standup);
  }, [props.standup]);

  const modal = () => {
    return (
      <Modal
        id="see-notes-modal"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
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
            onClick={() => setModalIsOpen(false)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>{props.standup.notes}</p>
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

      {props.standup.notes !== null && modal()}
    </div>
  );
}
