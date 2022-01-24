import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";

export default function PageRoutes(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<Dashboard team_id={1} />} />
      </Routes>
    </Router>
  );
}
