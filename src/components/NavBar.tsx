import PageProps from "../utils/interfaces/PageProps";
import "../css/navbar.css";
import { Link } from "react-router-dom";

export default function NavBar(props: PageProps): JSX.Element {
  console.log(props.currentUser.image_url);
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="navbar-logo">StandUp</h1>
      </Link>
      <div className="user-info">
        <div className="container">
          <span className="d-inline-block">Hi, {props.currentUser.name}</span>
          <span className="d-inline-block btn float-right">
            <img
              className="user-photo"
              src={
                props.currentUser.image_url
                  ? props.currentUser.image_url
                  : "images/user.png"
              }
              alt={props.currentUser.name}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
