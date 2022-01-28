import { useEffect, useState } from "react";
import fetchUsers from "../utils/fetch/fetchUsers";
import { UserInterface } from "../utils/interfaces/UserInterface";
import PageProps from "../utils/interfaces/PageProps";
import { Link } from "react-router-dom";
import "../css/app.css";

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
    const user = getUserByID(id);
    // console.log(user)
    props.setCurrentUser(user);
    props.setTeam(user.team_id);
  }

  return (
    <div>
      <h1>StandUp</h1>
      <select
        className="login-dropdown"
        name="login"
        id="inner"
        value={props.currentUser.id}
        onChange={(e) => {
          logIn(parseInt(e.target.value));
        }}
      >
        <option value={0} disabled>
          Choose name to log in
        </option>
        {usersList}
      </select>
      <Link to="/dashboard">
        <button>Log In</button>
      </Link>
    </div>
  );
}
