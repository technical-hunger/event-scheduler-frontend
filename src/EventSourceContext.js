import React, { createContext, useState } from "react";

const EventSourceContext = new createContext();

const ContextProvider = ({ children }) => {

    const [eventSources, setEventSources] = useState([]);
    const [subscribedEvents, setSubscribedEvents] = useState([]);

    const addEventSource = (eventSource) =>{
        const sources = eventSources;
        sources.push(eventSource);
        setEventSources(sources);
    }

    return (
        <EventSourceContext.Provider value={{ subscribedEvents, setSubscribedEvents, addEventSource}}>
            { children }
        </EventSourceContext.Provider>
    )
}

export { ContextProvider, EventSourceContext }