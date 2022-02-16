import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UserInterface } from "./utils/interfaces/UserInterface";

import Home from "./pages/Home";

export default function PageRoutes(): JSX.Element {
  // const [currentUser, setCurrentUser] = useState<UserInterface>({
  //   id: 0,
  //   name: "",
  //   team_id: 0,
  //   image_url: "",
  // });

  const [currentUser, setCurrentUser] = useState<UserInterface>(() => {
    // getting stored value
    const saved = localStorage.getItem("currentUser");

    // const initialValue = JSON.parse(saved);
    return saved
      ? JSON.parse(saved)
      : {
          id: 0,
          name: "",
          team_id: 0,
          image_url: "",
        };
  });

  useEffect(() => {
    setTeam(currentUser.team_id);
  }, [currentUser]);

  const [team, setTeam] = useState<number>(0);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              team={team}
              setTeam={setTeam}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              team={team}
              setTeam={setTeam}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}
