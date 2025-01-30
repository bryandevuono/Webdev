import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Table, TableHead, TableRow, TableBody, TableCell, Button } from '@mui/material';

interface UserListPageProps {
    users: { name: string, review: string }[];
    eventTitle: string;
}

const UserListPage: React.FC<UserListPageProps> = ({ users, eventTitle }) => {
    const { eventId } = useParams<{ eventId: string }>();

    return (
        <div>
            <h2>Attendees for {eventTitle}</h2>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Review</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.review}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Button variant="contained" color="primary" onClick={() => window.history.back()}>
                Back
            </Button>
        </div>
    );
};

export default UserListPage;