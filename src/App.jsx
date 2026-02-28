import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  const user = true;

  return (
    <ProfileProvider>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          {/* Catch-all routes for sidebar links that don't have pages yet */}
          <Route path="/chats" element={user ? <Home /> : <Login />} />
          <Route path="/videos" element={user ? <Home /> : <Login />} />
          <Route path="/groups" element={user ? <Home /> : <Login />} />
          <Route path="/bookmarks" element={user ? <Home /> : <Login />} />
          <Route path="/jobs" element={user ? <Home /> : <Login />} />
          <Route path="/events" element={user ? <Home /> : <Login />} />
          <Route path="/questions" element={user ? <Home /> : <Login />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
}

export default App;
