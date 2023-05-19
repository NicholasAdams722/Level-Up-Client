import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getGameTypes, updateGame} from "../../managers/GameManager.js";


export const GameForm = () => {
  const navigate = useNavigate();
  const [gameTypes, setGameTypes] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentGame, setCurrentGame] = useState({
    skillLevel: 1,
    numberOfPlayers: 0,
    title: "",
    maker: "",
    gameTypeId: 0,
  });

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((res) => setGameTypes(res));
  }, []);

  const changeGameState = (domEvent) => {
    // TODO: Complete the onChange function
    //Make copy of current game and resets copy of current game
    //page rerenders with changed game state

    const copy = { ...currentGame };
    copy[domEvent.target.name] = domEvent.target.value
    setCurrentGame(copy);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Game</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Title: </label>
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
      <select onChange={changeGameState} name="gameTypeId">

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
            type="number"
            name="skillLevel"
            required
            autoFocus
            className="form-control"
            value={currentGame.skillLevel}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="numberOfPlayers">Number of Players: </label>
          <input
            type="number"
            name="numberOfPlayers"
            required
            autoFocus
            className="form-control"
            value={currentGame.numberOfPlayers}
            onChange={changeGameState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const game = {
            maker: currentGame.maker,
            title: currentGame.title,
            number_of_players: parseInt(currentGame.numberOfPlayers),
            skill_level: parseInt(currentGame.skillLevel),
            game_type: parseInt(currentGame.gameTypeId),
          };

          // Send POST request to your API
          createGame(game).then(() => navigate("/games"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
