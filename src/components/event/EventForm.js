import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent, getEvents } from  "../../managers/EventManager.js" 
import { getGames } from "../../managers/GameManager.js";

export const EventForm = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);

  /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
  const [currentEvent, setCurrentEvent] = useState({
    description : "",
    date: "",
    time: "",
    gameId: 0,
  });

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGames().then((res) => setGames(res));
  }, [/*When the page loads*/]);

  const changeEventState = (domEvent) => {
    // TODO: Complete the onChange function
    //Make copy of current game and resets copy of current game
    //page rerenders with changed game state

    const copy = { ...currentEvent };
    copy[domEvent.target.name] = domEvent.target.value
    setCurrentEvent(copy);
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Event Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
            value={currentEvent.description}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

<fieldset>
    <label>Game:</label>
      <select onChange={changeEventState} name="gameId">

        {games.map((game) => (
            <option key={game.id} value={game.id}>
                {game.title}
                </option>
          )
        )}
      </select>
</fieldset>

      {/* TODO: create the rest of the input fields */}

      <fieldset>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            name="date"
            required
            autoFocus
            className="form-control"
            value={currentEvent.date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <fieldset>
        <div className="form-group">
          <label htmlFor="time">Time: </label>
          <input
            type="time"
            name="time"
            required
            autoFocus
            className="form-control"
            value={currentEvent.time}
            onChange={changeEventState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();

          const event = {
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            gameId: parseInt(currentEvent.gameId),
          };

          // Send POST request to your API
          createEvent(event).then(() => navigate("/events"));
        }}
        className="btn btn-primary"
      >
        Create
      </button>
    </form>
  );
};
