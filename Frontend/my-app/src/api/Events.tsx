import { Event } from "react-big-calendar"

export const getAllEvents = async (): Promise<Array<Event>> => {
    const response = await fetch('http://localhost:5053/api/events/GetAllEvents', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    const Events: Array<Event> = [];

    for (let i = 0; i < data.length; i++) {
        const EventToAdd: Event = {
            start: new Date(data[i].startTime),
            end: new Date(data[i].endTime),
            title: data[i].title,
        };
        Events.push(EventToAdd);
    }
    return Events;
};

export type EventRequestBody = {
    title: string,
    description: string,
    location: string,
    startTime: string,
    endTime: string
} 

export const editEvent = async (eventTitle: string, eventInfo: EventRequestBody): Promise<boolean> => {
    const response = await fetch(`http://localhost:5053/api/events/EditEvent?Title=${eventTitle}`, {
        method: 'PUT',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventInfo)
    });

    if (response.ok){
        return true;
    }
    else{
        return false;
    }
}

export const deleteEvent = async (eventTitle: string): Promise<boolean> => {
    const response = await fetch(`http://localhost:5053/api/eventattendance/getId/${eventTitle}`, {
        method: 'DELETE',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        return true;
    }
    else{
        return false;
    }
}

export const getEventId = async (eventTitle: string): Promise<string> => {
    const response = await fetch(`http://localhost:5053/api/eventattendance/getId/${eventTitle}`, {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.text();
    return data.replace(/^"|"$/g, '');;
}