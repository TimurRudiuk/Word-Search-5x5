import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadSettings } from "./store/settingsSlice";

import StartPage from "./pages/StartPage/StartPage";
import GamePage from "./pages/GamePage/GamePage";
import GameCompleteModal from "./components/GameCompleteModal/GameCompleteModal";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadSettings());
  }, [dispatch]);

  const handleStartGame = () => {
    const userId = Date.now();
    navigate(`/game/${userId}`);
  };

  const handleGoToStart = () => {
    navigate("/");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage onStart={handleStartGame} />} />
        <Route path="/game/:userId" element={<GamePage onMainMenu={handleGoToStart} />} />
      </Routes>

      <GameCompleteModal />
    </>
  );
}

export default App;
