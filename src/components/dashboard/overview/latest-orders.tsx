'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { auth, db } from '@/lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export interface Reservation {
  referenceNo: string;
  trainId: string;
  fromCity: string;
  toCity: string;
  numTickets: number;
  dateTime: Date;
}

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

export function LatestReservations(): React.JSX.Element {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchReservations = async (): Promise<void> => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        const email = user?.email;
        if (user) {
          const q = query(collection(db, 'reservations'), where('email', '==', email));
          const querySnapshot = await getDocs(q);
          const newFetchedReservations: Reservation[] = querySnapshot.docs.map((docs) => ({
            referenceNo: docs.id,
            ...docs.data(),
          } as Reservation));
          setReservations(newFetchedReservations);
          setLoading(false);
        };
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const deleteReservation = async (reservation: Reservation): Promise<void> => {
    try {
      await deleteDoc(doc(collection(db, 'reservations'), reservation.referenceNo));
      setReservations(reservations.filter((r) => r.referenceNo !== reservation.referenceNo));
      // Update train seats available
      const trainDoc = doc(db, 'trains', reservation.trainId);
      const trainSnap = await getDoc(trainDoc);
      const train = trainSnap.data() as Train;
      await updateDoc(trainDoc, {
        seatsAvailable: train.seatsAvailable + reservation.numTickets,
      });
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader title="Latest Reservations" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Reference No</TableCell>
              <TableCell>Train ID</TableCell>
              <TableCell>From City</TableCell>
              <TableCell>To City</TableCell>
              <TableCell>Number of Tickets</TableCell>
              <TableCell>Date and Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.referenceNo}>
                <TableCell>{reservation.referenceNo}</TableCell>
                <TableCell>{reservation.trainId}</TableCell>
                <TableCell>{reservation.fromCity}</TableCell>
                <TableCell>{reservation.toCity}</TableCell>
                <TableCell>{reservation.numTickets}</TableCell>
                <TableCell>{reservation.dateTime.toLocaleString()}</TableCell>
                <TableCell>
              <Button onClick={() => deleteReservation(reservation)}>Delete</Button>
            </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
