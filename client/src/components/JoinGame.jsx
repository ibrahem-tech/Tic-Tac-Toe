import React from "react";
import { useState } from "react";

const JoinGame = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [gameId, setGameId] = useState("");

  return (
    <div className="join-game">
      <h4>Join existing game</h4>
      <div className="form-group row">
        <div className="col">
          <input
            type="text"
            placeholder="Enter your name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            placeholder="Enter game Id"
            className="form-control"
            onChange={(e) => setGameId(e.target.value)}
          />
        </div>
        <div className="col">
          <button className="button" onClick={() => onFormSubmit(name, gameId)}>
            Join Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGame;
