// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import useAuth from "./hooks/useAuth";
import axios from "axios";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreateTopic from "./pages/CreateTopicPage/CreateTopic";
import TopicPage from "./pages/TopicPage/TopicPage";
import DirectMessagesPage from "./pages/DirectMessagesPage/DirectMessagesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const [user, token] = useAuth();

  console.log(user);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:userName"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/topic"
          element={
            <PrivateRoute>
              <CreateTopic />
            </PrivateRoute>
          }
        />

        <Route
          path="/topic/:topicId"
          element={
            <PrivateRoute>
              <TopicPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/Messages"
          element={
            <PrivateRoute>
              <DirectMessagesPage />
            </PrivateRoute>
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
// test
