import { UserInterface } from "./UserInterface";

export default interface PageProps {
  team: number;
  setTeam: React.Dispatch<React.SetStateAction<number>>;

  currentUser: UserInterface;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserInterface>>;
}
