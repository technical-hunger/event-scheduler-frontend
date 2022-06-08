import React, { useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { EventSourceContext } from '../EventSourceContext';

const CreateEvent = () => {

    const [msg, setMsg] = useState('');
    const [time, setTime] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const { addEventSource, subscribedEvents, setSubscribedEvents } = useContext(EventSourceContext);
    const navigate = useNavigate();
    
    const createEvent = ( props ) =>{

        const event = {
            title: title,
            time: new Date(time).toISOString(),
            description: description
        };
        axios.post('http://localhost:8080/event-scheduler/events/add',event)
                .then(result => {
                    console.log(result);
                    setMsg('Event Scheduled!');
                    
                    const eventSource = new EventSource(`http://localhost:8080/event-scheduler/events/subscribe/${result.data.id}`);
                    const subscribed = subscribedEvents;
                    subscribed[result.data.id] = true;
                    setSubscribedEvents(subscribed);

                    eventSource.addEventListener('started', function(event){
                        console.log('Event started');
                        const subscribed = subscribedEvents;
                        subscribed.splice(event.id,1);
                        setSubscribedEvents(subscribed);

                        return  navigate(`/events/${event.data}`);
                        
                    });

                    addEventSource(eventSource);
                })
                .catch(error => setMsg(error.message));
    }

    return (
        <div className="container" style={{marginTop: "2em"}}>
            <h1 style={{textAlign: "center"}}>Create event</h1>
            <hr/>
                <div className="row justify-content-center">
                    <div className="form-group  col-sm-12 col-md-5">
                        <label htmlFor="event-time">Event time</label>
                        <input  name="time" type="datetime-local" value={time}  onChange={(e) => setTime(e.target.value)} className="form-control"  id="event-time" />
                    </div>     
                    <div className="form-group  col-sm-12 col-md-5">
                        <label htmlFor="event-title">Event title</label>
                        <input  name="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="event-title" placeholder="Event title" />
                    </div>     
                </div>
                
                <div className="row justify-content-center">    
                    <div className="form-group col-sm-12 col-md-5">
                        <label htmlFor="event-description">Event description</label>
                        <textarea  name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)}  className="form-control" id="event-description" placeholder="Event title"></textarea>
                    </div>     
                    
                    <div className="form-group col-md-5"></div>
                </div>
                <div className="row"> 
                    <div className="col-md-1"></div> 
                    
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={() => createEvent()} >Create Event</button>
                    </div>
                    <div className="col-md-8 ml-5">
                        <h3>{msg}</h3>   
                    </div>
                    
                </div>
        </div>
  )
}

export default CreateEvent