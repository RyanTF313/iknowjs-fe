import { useState, createContext } from "react";
import { Route, Routes } from "react-router-dom";
// import Header from "./Components/Header";
// import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Feed from "./Pages/Feed";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import Nav from "./Components/Nav";
import Errors from "./Components/Errors";

export const ErrorContext = createContext({});
export const AuthContext = createContext({});

function App() {
  const [error, setError] = useState({});
  const [user, setUser] = useState({});

  return (
    <div>
      <ErrorContext.Provider value={{ error, setError }}>
        <AuthContext.Provider value={{ user, setUser }}>
          <Nav />
          <Errors error={error} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/lobby" element={<Feed />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </AuthContext.Provider>
      </ErrorContext.Provider>
    </div>
  );
}

export default App;
