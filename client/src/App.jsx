import React, { useState } from "react";
import "./App.css";
import CreateGame from "./components/CreateGame";
import JoinGame from "./components/JoinGame";
import Game from "./pages/Game";

const App = () => {
  const [showGame, setShowGame] = useState(false);
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");

  const onFormSubmit = (name, gameId = "") => {
    setName(name);
    setGameId(gameId);
    setShowGame(true);
  };

  return (
    <div className="container">
      <h3 className="title">Multiplayer X-O</h3>
      {!showGame && (
        <>
          <CreateGame onFormSubmit={onFormSubmit} />

          <JoinGame onFormSubmit={onFormSubmit} />
        </>
      )}
      {showGame && <Game name={name} gameId={gameId} />}
    </div>
  );
};

export default App;
