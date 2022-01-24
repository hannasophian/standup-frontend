import { UserInterface } from "../utils/interfaces/UserInterface";

interface DashboardProps {
  team_id: number;
  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}

export default function Dashboard(props: DashboardProps): JSX.Element {
  return <h1>Dashboard for team {props.team_id}</h1>;
}
