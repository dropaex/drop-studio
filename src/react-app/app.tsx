import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
