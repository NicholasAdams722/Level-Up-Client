import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager.js"
import { useNavigate } from "react-router-dom"


export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">

<button className="btn btn-2 btn-sep icon-create"
    onClick={() => {
        navigate({ pathname: "/events/new" })
    }}
>Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">{event.description}</div>
                        <div className="event__date">{event.date}</div>
                        <div className="event__time">Starting at {event.time}</div>
                        <div className="event__organizer">Organized by {event.organizer}</div>
                        <div className="event__game">{event.game}</div>
                        <div className="event__attendees">Attendees: {event.attendees}</div>
                    </section>
                })
            }
        </article>
    )
}