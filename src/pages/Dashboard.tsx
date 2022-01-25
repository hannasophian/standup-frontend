// import { UserInterface } from "../utils/interfaces/UserInterface";
import NavBar from "../components/NavBar";
import PageProps from "../utils/interfaces/PageProps";

export default function Dashboard(props: PageProps): JSX.Element {
  return (
    <div className="dashboard">
      <NavBar
        team={props.team}
        setTeam={props.setTeam}
        currentUser={props.currentUser}
        setCurrentUser={props.setCurrentUser}
      />
      <h1>Team {props.team}</h1>
    </div>
  );
}
