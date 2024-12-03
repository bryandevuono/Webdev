import { Event } from "react-big-calendar"

export const GetAllEvents = async (): Promise<Array<Event>> => {
    const response = await fetch('http://localhost:5053/api/events/GetAllEvents', {
        method: 'GET',
        credentials: 'include' as RequestCredentials,
        headers: {
            'Content-Type': 'application/json'
        }

    });
    const data = await response.json()
    const Events: Array<Event> = [];

    for (let i = 0; i<data.length; i++){
        const EventToAdd: Event = {
            start: data[i].StartTime,
            end: data[i].EndTime,
            title: data[i].title
        }
        Events.push(EventToAdd);
    }
    console.log(Events);
    return Events;
}