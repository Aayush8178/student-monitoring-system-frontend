import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import AtRiskStudents from "./pages/AtRiskStudents";
import Settings from "./pages/Settings";
import StudentDashboard from "./pages/StudentDashboard";
import Navbar from "./components/Navbar";
import RequireRole from "./components/RequireRole";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* navbar(different for student and admin ) */}
        {token && <Navbar />}

        
        <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
          <Routes>
            {/* PUBLIC */}
            <Route path="/login" element={<Login />} />

            {/* ADMIN ROUTES */}
            <Route
              path="/"
              element={
                <RequireRole role="admin">
                  <Dashboard />
                </RequireRole>
              }
            />

            <Route
              path="/analytics"
              element={
                <RequireRole role="admin">
                  <Analytics />
                </RequireRole>
              }
            />

            <Route
              path="/at-risk"
              element={
                <RequireRole role="admin">
                  <AtRiskStudents />
                </RequireRole>
              }
            />

            <Route
              path="/settings"
              element={
                <RequireRole role="admin">
                  <Settings />
                </RequireRole>
              }
            />

            {/* STUDENT ROUTE */}
            <Route
              path="/student"
              element={
                <RequireRole role="student">
                  <StudentDashboard />
                </RequireRole>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
