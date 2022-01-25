// import { UserInterface } from "../utils/interfaces/UserInterface";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import StandupCard from "../components/StandupCard";
import fetchNextStandup from "../utils/fetch/fetchNextStandup";
import fetchPreviousStandups from "../utils/fetch/fetchPreviousStandups";
import fetchTeamName from "../utils/fetch/fetchTeamName";
import PageProps from "../utils/interfaces/PageProps";
import StandupInterface from "../utils/interfaces/StandupInterface";
import "../css/app.css";
import "../css/standupcard.css";

export default function Dashboard(props: PageProps): JSX.Element {
  const [teamName, setTeamName] = useState<string>("");
  const [nextStandup, setNextStandup] = useState<StandupInterface>();
  const [previousStandups, setPreviousStandups] =
    useState<StandupInterface[]>();

  useEffect(() => {
    fetchTeamName(props.team).then((res) => {
      setTeamName(res ? res : "");
    });

    fetchNextStandup(props.team).then((res) => {
      if (res) {
        setNextStandup(res);
      }
    });

    fetchPreviousStandups(props.team).then((res) => {
      if (res) {
        setPreviousStandups(res);
      }
    });
    // eslint-disable-next-line
  }, []);

  const previousCards = previousStandups ? (
    previousStandups.map((standup) => {
      return (
        <StandupCard
          key={standup.id}
          standup={standup}
          currentUserID={props.currentUser.id}
        />
      );
    })
  ) : (
    <p>No previous Standups</p>
  );

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row">
          <NavBar
            team={props.team}
            setTeam={props.setTeam}
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </div>
        <div className="row">
          <h1>{teamName}</h1>
        </div>
        <div className="dashboard-body">
          <div className="standup-display">
            <h2>Next StandUp</h2>
            {nextStandup && (
              <StandupCard
                standup={nextStandup}
                currentUserID={props.currentUser.id}
              />
            )}
            <br />
            <h2>Previous StandUps</h2>
            {previousStandups && previousCards}
          </div>
          <div className="right-col">This is the side stuff</div>
        </div>
      </div>
    </div>
  );
}
