//TODO Create form to update an existing Game

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGameById, getGameTypes, updateGame } from "../../managers/GameManager.js";
import { useParams } from "react-router-dom";

export const UpdateGameForm = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);
  //const [game, setGame] = useState({});
  const [currentGame, setCurrentGame] = useState({
    skill_level: "",
    number_of_players: 0,
    title: "",
    maker: "",
    game_type: 0,
  });

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((res) => setGameTypes(res));
  }, []);

  //Add use effect to get game from database
  
  useEffect(() => {
    getGameById(gameId).then((res) => setCurrentGame(res))
  }, []);

  // useEffect(() => {
  //   getGameById(gameId).then((res) => {
  //     setGame(res);
  //     setCurrentGame({
  //       ...currentGame,
  //       title: res?.title,
  //       maker: res?.maker,
  //       numberOfPlayers: res?.number_of_players,
  //       skill_level: res?.skill_level,
  //       game_type: parseInt(res?.game_type?.id)
  //     });
  //   });
  // }, []);

  const changeGameState = (domEvent) => {
    // TODO: Complete the onChange function
    //Make copy of current game and resets copy of current game
    //page rerenders with changed game state

    const copy = { ...currentGame };
    copy[domEvent.target.name] = domEvent.target.value
    setCurrentGame(copy);
  };

  // const changeGameState = (evt) => {
  //   const { name, value } = evt.target;
  //   setCurrentGame({ ...currentGame, [evt.target.name]: value });
  // };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Update New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Game Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentGame.title}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

<fieldset>
      <select onChange={changeGameState} name="game_type" value= {currentGame.game_type}>

        {gameTypes.map((gameType) => (
            <option key={gameType.id} value={gameType.id}>
                {gameType.label}
                </option>
          )
        )}
      </select>
</fieldset>

      {/* TODO: create the rest of the input fields */}

      <fieldset>
        <div className="form-group">
          <label htmlFor="maker">Maker: </label>
          <input
            type="text"
            name="maker"
            required
            autoFocus
            className="form-control"
            value={currentGame.maker}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="skillLevel">Skill Level: </label>
          <input
            type="text"
            name="skill_level"
            required
            autoFocus
            className="form-control"
            value={currentGame.skill_level}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players: </label>
          <input
            type="number"
            name="number_of_players"
            required
            autoFocus
            className="form-control"
            value={currentGame.number_of_players}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const updatedGame = {
            id: parseInt(currentGame.id),
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.number_of_players),
            skill_level: currentGame.skill_level,
            game_type: parseInt(currentGame.game_type),
          };

          // Send POST request to your API
          updateGame(updatedGame).then(() => navigate("/games"));
        }}
        className="btn btn-primary"
      >
        Update Game
      </button>
    </form>
  );
    }
