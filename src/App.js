
import './App.css';
import CreateEvent from './components/CreateEvent';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import Home from './components/Home';
import Navigation from './components/Navigation';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
      <div className="App">
            <Navigation />
            <div>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/events" element={<Events />} />
                    <Route exact path="/create-event" element={<CreateEvent />}/>
                      
                    <Route exact path="/events/:eventId" element={<EventDetails />} />
                  </Routes>
              </div>
      </div>
    
  );
}

export default App;
