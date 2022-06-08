import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [ isError, setIsError ] = useState(false);
   
        useEffect(() => {
            fetchEvent();
        })
    

    const fetchEvent = () => {
        axios.get(`http://localhost:8080/event-scheduler/events/${eventId}`)
              .then(result => {
                  console.log(result)
                setEvent(result.data);          
              })
              .catch(error => {
                  console.log(error.message)
                  setIsError(true)
                });
      }

    return (
        <div className="container" style={{marginTop: '1em'}}>
            <div className="row justify-content-center">
                {isError && (
                    <div className="jumbotron col-md-8">
                        <h1 className="display-4">Event not found</h1>
                        <p className="lead">There is no such event found for eventId: {eventId}</p>
                    </div>)}   
                {!isError && (
                    <div className="jumbotron col-md-8">
                        <h1 className="display-4">{event?.title}</h1>
                        <p className="lead">{event?.description}</p>
                    </div>)}                   
            </div>
        </div>
    )
}

export default EventDetails