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
import SideBar from "../components/SideBar";
// import { Link } from "react-router-dom";

export default function Dashboard(props: PageProps): JSX.Element {
  const [teamName, setTeamName] = useState<string>("");
  const [nextStandup, setNextStandup] = useState<StandupInterface>();
  const [previousStandups, setPreviousStandups] =
    useState<StandupInterface[]>();
  const [teamMembers, setTeamMembers] = useState<UserInterface[]>([]);
  const [seeMembers, setSeeMembers] = useState<boolean>(false);
  const [newStandupIsOpen, setNewStandupIsOpen] = useState<boolean>(false);
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
              <span
                className="clickable-text"
                onClick={() => setSeeMembers(!seeMembers)}
              >
                <p>
                  <u>See all members</u>
                </p>
              </span>
              {/* <button onClick={() => setSeeMembers(!seeMembers)}>
                See all members
              </button> */}

              {seeMembers && (
                <div className="member-list">
                  <p>{memberList}</p>
                </div>
              )}
            </div>
            <div className="mobile-new-standup">
              <button
                onClick={() => setNewStandupIsOpen(true)}
                className="btn btn-primary"
              >
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
              <SideBar
                team={props.team}
                teamMembers={teamMembers}
                currentUser={props.currentUser}
                setNextStandup={setNextStandup}
                setFutureStandups={setFutureStandups}
                futureStandups={futureStandups}
                setPreviousStandups={setPreviousStandups}
                nextStandup={nextStandup}
                newStandupIsOpen={newStandupIsOpen}
                setNewStandupIsOpen={setNewStandupIsOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
