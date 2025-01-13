
export const getEventAttendees = async (eventId: string): Promise<{ userId: string }[]> => {
    const response = await fetch(`http://localhost:5053/api/eventattendance/${eventId}/attendees`);
    if (!response.ok) {
        throw new Error("Failed to fetch attendees");
    }
    return response.json();
};

export const updateEventAttendance = async (eventId: string, userId: string, rating: string, feedback: string): Promise<boolean> => {
    const body = JSON.stringify({ userId, eventId, rating, feedback });
    const response = await fetch(`http://localhost:5053/api/eventattendance`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
    
    if(response.ok){
        return true;
    }
    else{
        return false;
    }
};



