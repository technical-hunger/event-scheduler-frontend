import React, {  useContext, useState,useEffect } from 'react'

import { useNavigate  } from 'react-router-dom';
import { EventSourceContext } from '../EventSourceContext';

const Event = ( { event } ) => {
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  // const [eventId, setEventId] = useState(event.id);
  const { addEventSource, subscribedEvents, setSubscribedEvents} = useContext(EventSourceContext);
  const navigate = useNavigate();
  
  
  const checkIfSubscribed = () =>{
    if(subscribedEvents[event.id]){
        setIsSubscribed(true);
     }   
  }

  useEffect(() => {
    checkIfSubscribed();
  });

  const subscribe = () =>{
      const eventSource = new EventSource(`http://localhost:8080/event-scheduler/events/subscribe/${event.id}`);
      setIsSubscribed(true);
      const subscribed = subscribedEvents;
      subscribed[event.id] = true;
      setSubscribedEvents(subscribed);
    
      eventSource.addEventListener('started', function(event){
                        console.log('Event started');
                        
                        return  navigate(`/events/${event.id}`);
                    });

      addEventSource(eventSource);
  }

  return (
        <div className="card text-white bg-dark mb-3 ml-5" style={{width: "18rem"}}>
            <div className="card-header"><h3>{event.title}</h3></div>
            <div className="card-body">
            <p className="card-title">{ event.time }</p>
            <p className="card-text">
               { event.description }
            </p>
            {isSubscribed ? 
            (<p className="text-primary">Subscribed</p>) : 
            (<button className="btn btn-primary" onClick={() => subscribe()}>Subscribe</button>)}
            
            </div>
        </div>
  )
}

export default Event