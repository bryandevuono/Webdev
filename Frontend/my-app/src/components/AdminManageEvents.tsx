import {useEffect, useState} from 'react';
import { GetAllEvents } from '../api/Events';
import Calendar from './Calendar';
import { CalendarEvent } from './EventCalendar';

const AdminManageEvents = (): JSX.Element => {
    const [Events, setEvents] = useState<CalendarEvent[] | undefined>(undefined);

    const GetEvents = async () => {
        const AllEvents = await GetAllEvents();
        setEvents(AllEvents as CalendarEvent[]);
    };

    useEffect(() => {
        GetEvents();
    }, []);

    return <Calendar events={Events} className="admin-events" view="agenda" toolbar={false}/>
}

export default AdminManageEvents;