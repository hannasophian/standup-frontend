import { useState } from "react";
import Modal from "react-modal";
import updateUser from "../utils/fetch/updateUser";
import { UserInterface } from "../utils/interfaces/UserInterface";

interface EditUserProps {
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ModalEditUser(props: EditUserProps): JSX.Element {
  const [input, setInput] = useState<UserInterface>({
    id: props.currentUser.id,
    name: props.currentUser.name,
    team_id: props.currentUser.team_id,
    image_url: props.currentUser.image_url,
  });

  async function handleSubmit() {
    if (input.name === null || input.name === "") {
      window.alert("Cannot submit activity with no title");
    } else {
      if (input.image_url === "") {
        console.log(input);
        setInput({ ...input, image_url: null });
      }
      props.setModalIsOpen(false);

      await updateUser(input);
      props.setCurrentUser(input);
    }
  }

  return (
    <Modal
      id="edit-user-modal"
      isOpen={props.modalIsOpen}
      onRequestClose={() => props.setModalIsOpen(false)}
      contentLabel="Edit User Modal"
      ariaHideApp={false}
    >
      <div className="modal-header">
        <div className="content">
          <h2>Edit Profile</h2>
        </div>
        <button
          type="button"
          className="close"
          onClick={() => props.setModalIsOpen(false)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <label htmlFor="name-input">Display name</label>
        <input
          id="name-input"
          placeholder="Optional"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
        ></input>

        <label htmlFor="url-input">Profile photo URL</label>
        <input
          id="url-input"
          placeholder="Optional"
          value={input.image_url ? input.image_url : ""}
          onChange={(e) => setInput({ ...input, image_url: e.target.value })}
        ></input>

        <button onClick={handleSubmit}>OK</button>
      </div>
    </Modal>
  );
}
