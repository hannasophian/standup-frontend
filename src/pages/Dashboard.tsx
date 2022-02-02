// import { UserInterface } from "../utils/interfaces/UserInterface";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import StandupCard from "../components/StandupCard";
import fetchNextStandup from "../utils/fetch/fetchNextStandup";
import fetchPreviousStandups from "../utils/fetch/fetchPreviousStandups";
import fetchTeamName from "../utils/fetch/fetchTeamName";
import PageProps from "../utils/interfaces/PageProps";
import StandupInterface from "../utils/interfaces/StandupInterface";
import "../css/dashboard.css";
import "../css/standupcard.css";
import { UserInterface } from "../utils/interfaces/UserInterface";
import fetchTeamMembers from "../utils/fetch/fetchTeamMembers";
import ModalNewStandup from "../components/ModalNewStandup";
import fetchWheelURL from "../utils/fetch/fetchWheelURL";
import FutureStandups from "../components/FutureStandups";
import fetchFutureStandups from "../utils/fetch/fetchFutureStandups";
// import { Link } from "react-router-dom";

export default function Dashboard(props: PageProps): JSX.Element {
  const [teamName, setTeamName] = useState<string>("");
  const [nextStandup, setNextStandup] = useState<StandupInterface>();
  const [previousStandups, setPreviousStandups] =
    useState<StandupInterface[]>();
  const [teamMembers, setTeamMembers] = useState<UserInterface[]>([]);
  const [seeMembers, setSeeMembers] = useState<boolean>(false);
  const [newStandupIsOpen, setNewStandupIsOpen] = useState<boolean>(false);
  const [wheelURL, setWheelURL] = useState<string>("wheelofnames.com");
  const [futureStandups, setFutureStandups] = useState<StandupInterface[]>();

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

    fetchTeamMembers(props.team).then((res) => {
      if (res) {
        setTeamMembers(res);
      }
    });

    fetchWheelURL(props.team).then((res) => {
      if (res) {
        setWheelURL(res);
      }
    });

    fetchFutureStandups(props.team).then((res) => {
      if (res) {
        setFutureStandups(res);
      }
    });
    // eslint-disable-next-line
  }, []);

  const previousCards = previousStandups ? (
    previousStandups.map((standup) => {
      return (
        <StandupCard
          key={standup.id}
          setNextStandup={setNextStandup}
          setPreviousStandups={setPreviousStandups}
          standup={standup}
          currentUserID={props.currentUser.id}
          teamMembers={teamMembers}
          setFutureStandups={setFutureStandups}
        />
      );
    })
  ) : (
    <p>No previous Standups</p>
  );

  const memberList = teamMembers.map((user) => user.name).join(", ");

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row">
          <NavBar
            team={props.team}
            setTeam={props.setTeam}
            currentUser={props.currentUser}
            setCurrentUser={props.setCurrentUser}
          />
        </div>
        <div className="page-content">
          <header>
            <div className="dashboard-header">
              <h1>{teamName}</h1>
              <button onClick={() => setSeeMembers(!seeMembers)}>
                See all members
              </button>

              {seeMembers && (
                <div className="member-list">
                  <p>{memberList}</p>
                </div>
              )}
            </div>
            <div className="mobile-new-standup">
              <button onClick={() => setNewStandupIsOpen(true)}>
                New Standup
              </button>
            </div>
          </header>
          <hr />
          <div className="dashboard-body">
            <div className="standup-display">
              <h2>Next StandUp</h2>
              {nextStandup && (
                <StandupCard
                  setNextStandup={setNextStandup}
                  setPreviousStandups={setPreviousStandups}
                  standup={nextStandup}
                  currentUserID={props.currentUser.id}
                  teamMembers={teamMembers}
                  setFutureStandups={setFutureStandups}
                />
              )}
              <br />
              <h2>Previous StandUps</h2>
              {previousStandups && previousCards}
            </div>
            <div className="right-col">
              <div className="row">
                <button onClick={() => setNewStandupIsOpen(true)}>
                  New Standup
                </button>
              </div>
              <div className="row">
                <a href={wheelURL}>
                  <button>Wheel of Names</button>
                </a>
              </div>
              {futureStandups && (
                <FutureStandups
                  team_id={props.team}
                  standups={futureStandups}
                  teamMembers={teamMembers}
                  setFutureStandups={setFutureStandups}
                  setNextStandup={setNextStandup}
                  setPreviousStandups={setPreviousStandups}
                />
              )}
            </div>
            <ModalNewStandup
              setNextStandup={setNextStandup}
              setPreviousStandups={setPreviousStandups}
              newStandupIsOpen={newStandupIsOpen}
              setNewStandupIsOpen={setNewStandupIsOpen}
              teamMembers={teamMembers}
              teamID={props.team}
              currentUserID={props.currentUser.id}
              nextStandup={nextStandup}
              setFutureStandups={setFutureStandups}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
