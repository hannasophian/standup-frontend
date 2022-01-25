import { useEffect } from "react";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface NotesDisplayProps {
  currentUserID: number;
  chairID: number;
  standup: StandupInterface;
}

export default function NotesDisplay(props: NotesDisplayProps): JSX.Element {
  // if there are notes, have show notes button
  const notesButton = () => {
    return <button>Show Notes</button>;
  };
  // If no notes and user = chair, have 'add notes' button
  const addNoteButton = () => {
    return <button>Add Notes</button>;
  };

  useEffect(() => {
    console.log(props.standup);
  }, [props.standup]);

  return (
    <div className="notesdisplay">
      {props.standup.notes !== null && notesButton()}
      {props.standup.notes === null &&
        props.currentUserID === props.chairID &&
        addNoteButton()}
    </div>
  );
}
