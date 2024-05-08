import './App.css';
import Login from './Login'
import Register from './Register'
import Home from './Home'
import EventRegistration from './EventRegistration';
import Archive from './Archive'
import MyEvents from './MyEvents'
import Feedback from './Feedback'
import EventInfo from './EventInfo'
import MyPrograms from './MyPrograms'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowFeedbacks from './ShowFeedbacks';


function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/my_programs" element={<MyPrograms/>} />
          <Route path="/event_info/:id" element={<EventInfo />} />
          <Route path="feedbacks/:type/:id" element={<ShowFeedbacks />} />
          <Route path="/feedback/:type/:id" element={<Feedback />} />
          <Route path="/my_events" element={<MyEvents />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/registration" element={<Register />} />
          <Route path="/event_registration/:eventId" element={<EventRegistration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
