'use client'
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import dayjs from 'dayjs';
import { db } from '@/lib/firebase';
import { onSnapshot, collection } from 'firebase/firestore';

export interface Train {
  id: string;
  trainNo: string;
  trainName: string;
  fromCity: string;
  toCity: string;
  seatsAvailable: number;
  trainType: string;
  frequency: string;
  departureTime: string;
  destinationTime: string;
  ticketPrice: string;
}

export function TrainsTable(): React.JSX.Element {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'trains'), (snapshot) => {
      const newTrains: Train[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      } as Train));
      setTrains(newTrains);
      setLoading(false);
    }, (_) => {
      setLoading(false);
    });

    return () => { unsubscribe(); }; // Cleanup function
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Train No</TableCell>
          <TableCell>Train Name</TableCell>
          <TableCell>Source</TableCell>
          <TableCell>Destination</TableCell>
          <TableCell>Seats</TableCell>
          <TableCell>Seat Type</TableCell>
          <TableCell>Frequency</TableCell>
          <TableCell>Departure Time</TableCell>
          <TableCell>Destination Time</TableCell>
          <TableCell>Ticket Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trains.map((train) => (
          <TableRow key={train.id}>
            <TableCell>{train.trainNo}</TableCell>
            <TableCell>{train.trainName}</TableCell>
            <TableCell>{train.fromCity}</TableCell>
            <TableCell>{train.toCity}</TableCell>
            <TableCell>{train.seatsAvailable}</TableCell>
            <TableCell>{train.trainType}</TableCell>
            <TableCell>{train.frequency}</TableCell>
            <TableCell>{train.departureTime}</TableCell>
            <TableCell>{train.destinationTime}</TableCell>
            <TableCell>{train.ticketPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}