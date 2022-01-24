import { useEffect, useState } from "react";
import fetchUsers from "../utils/fetch/fetchUsers";
import { UserInterface } from "../utils/interfaces/UserInterface";

interface HomeProps {
  team_id: number;
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function Home(props: HomeProps): JSX.Element {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);

  useEffect(() => {
    fetchUsers().then((res) => {
      setAllUsers(res ? res : []);
    });
  }, []);

  useEffect(() => {
    console.log(props.currentUser);
  }, [props.currentUser]);

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

  return (
    <div>
      <h1>StandUp</h1>
      <select
        className="login-dropdown"
        name="login"
        id="inner"
        value={props.currentUser.id}
        onChange={(e) => {
          props.setCurrentUser(getUserByID(parseInt(e.target.value)));
        }}
      >
        <option value={0} disabled>
          Choose name to log in
        </option>
        {usersList}
      </select>
    </div>
  );
}
