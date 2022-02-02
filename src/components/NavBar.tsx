import PageProps from "../utils/interfaces/PageProps";
import "../css/navbar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";

export default function NavBar(props: PageProps): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="container-fluid">
        <nav className="navbar fixed-top navbar-expand-md justify-content-between">
          <div className="navbar-brand">
            <Link to="/">
              <h1 className="navbar-logo">StandUp</h1>
            </Link>
          </div>
          <div className="user-navbar-text">
            <div className="container">
              <span className="d-inline-block">
                <p>Hi, {props.currentUser.name}</p>
              </span>
              <span className="d-inline-block btn float-right">
                <img
                  className="nav-user-photo"
                  src={
                    props.currentUser.image_url
                      ? props.currentUser.image_url
                      : "images/user.png"
                  }
                  alt={props.currentUser.name}
                />
              </span>

              <svg
                onClick={() => setModalIsOpen(true)}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
              <ModalEditUser
                currentUser={props.currentUser}
                setCurrentUser={props.setCurrentUser}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
              />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
