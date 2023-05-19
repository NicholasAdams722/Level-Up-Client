import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { UpdateEventForm } from "../components/event/UpdateEvent"
import { UpdateGameForm } from "../components/game/UpdateGame"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/games/update/:gameId" element={<UpdateGameForm />} />
            <Route path="/events/update/:eventId" element={<UpdateEventForm />} />
            <Route path="/events/new" element={<EventForm />} />
            <Route path="/games/new" element={<GameForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
            <Route path="/games" element={<GameList />} />
            <Route path="/gameform" element= {<GameForm />} />
            </Route>

            
        </Routes>
    </>
}