import { useEffect, useState } from "react";
import fetchUsers from "../utils/fetch/fetchUsers";
import { UserInterface } from "../utils/interfaces/UserInterface";
import PageProps from "../utils/interfaces/PageProps";
import { Link } from "react-router-dom";
import "../css/home.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from "react-loader-spinner";

export default function Home(props: PageProps): JSX.Element {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    fetchUsers().then((res) => {
      setAllUsers(res ? res : []);
    });
  }, []);

  const usersList = allUsers.map((user) => {
    return (
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
    );
  });

  function getUserByID(id: number) {
    const user = allUsers.filter((user) => user.id === id);
    // props.setCurrentUser(user[0]);
    return user[0];
  }

  function logIn(id: number) {
    // if (props.currentUser.id === 0) {
    //   window.alert("Select a user to log in")
    // } else {
    const user = getUserByID(id);
    localStorage.setItem("currentUser", JSON.stringify(user));
    // console.log(user)
    props.setCurrentUser(user);
    props.setTeam(user.team_id);
    // }
  }

  return (
    <div className="home-page">
      <div className="content">
        <div className="row">
          <img
            className="home-illustration"
            src="images/conversation.svg"
            alt="two people having a conversation"
          />
          <h1>StandUp</h1>
          {allUsers.length !== 0 ? (
            <select
              className="login-dropdown"
              name="login"
              id="inner"
              value={props.currentUser.id}
              onChange={(e) => {
                logIn(parseInt(e.target.value));
              }}
            >
              {" "}
              <option value={0} disabled>
                Choose name to log in
              </option>
              {usersList}
            </select>
          ) : (
            <BallTriangle height="70px" color="#fc4f4f" ariaLabel="loading" />
          )}

          {props.currentUser.id !== 0 && (
            <Link to="/dashboard">
              <button type="button" className="btn btn-primary">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
