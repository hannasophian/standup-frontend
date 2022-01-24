import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { UserInterface } from "./utils/interfaces/UserInterface";

import Home from "./pages/Home";

export default function PageRoutes(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<UserInterface>({
    id: 0,
    name: "",
    team_id: 0,
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              team_id={1}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              team_id={1}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}
