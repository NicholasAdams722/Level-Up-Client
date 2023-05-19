//TODO Create Form to update an existing event

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent, getEventById } from  "../../managers/EventManager.js" 
import { getGames } from "../../managers/GameManager.js";


export const UpdateEventForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    description: "",
    game: 0,
    date: "",
    time: "",
    game_id: 0,
  });

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGames().then((res) => setGames(res));
  }, [/*When the page loads*/]);


  useEffect(() => {
    getEventById(eventId).then((res) => setCurrentEvent(res))
  }, []);

  const changeEventState = (domEvent) => {
    // TODO: Complete the onChange function
    //Make copy of current game and resets copy of current game
    //page rerenders with changed game state

    const copy = { ...currentEvent };
    copy[domEvent.target.name] = domEvent.target.value
    setCurrentEvent(copy);
  };

  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Register New Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="title">Event Title: </label>
          <input
            type="text"
            name="description"
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
      <select onChange={changeEventState} name="game">

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

          const updatedEvent = {
            id: parseInt(currentEvent.id),
            description: currentEvent.description,
            date: currentEvent.date,
            time: currentEvent.time,
            game_id: parseInt(currentEvent.game_id),
            game: parseInt(currentEvent.game)
          };

          // Send POST request to your API
          updateEvent(updatedEvent).then(() => navigate("/events"));
        }}
        className="btn btn-primary"
      >
        Update Event
      </button>
    </form>
  );
};
