import React, { useEffect, useState } from 'react'
import Event from './Event'
import axios from 'axios';

const Events = () => {
 
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetchEvents();
  })
  
  const fetchEvents = async () => {
    axios.get('http://localhost:8080/event-scheduler/events')
          .then(result => {
            let events = result.data;
            events = events.map(event => {
              event.time = new Date(event.time).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})
              return event;
            });
            setEvents(events);            
          })
          .catch(error => console.log(error.message));
  }

  return (
        <div className="container" style={{marginTop:"1em"}}>
            <h2 style={{textAlign:"center"}}>Upcomming events</h2>
            <div className="row">
                {events?.map((event) => (
                  <Event key={event.id} event={event} />
                ))}
            </div>
        </div>
  )
}

export default Events