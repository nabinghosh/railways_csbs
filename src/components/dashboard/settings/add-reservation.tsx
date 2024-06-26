'use client';

import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import { doc, setDoc, updateDoc, } from "firebase/firestore";
import { collection, query, where, getDocs, setDoc, updateDoc, doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';

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

export function CreateReservation(): React.JSX.Element {
  const user = auth.currentUser;
  const email = user?.email || '';
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState(false);
  // const [numTickets, setNumTickets] = useState(1);


  const handleSubmitSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);
    const trainsRef = collection(db, 'trains');
    const q = query(trainsRef, where('fromCity', '==', fromCity), where('toCity', '==', toCity));

    const querySnapshot = await getDocs(q);
    const newTrains: Train[] = querySnapshot.docs.map((docs) => ({
      id: docs.id,
      ...docs.data(),
    } as Train));
    setTrains(newTrains);
    setLoading(false);
  };

  const handleReserve = async (trainId: string): Promise<void> => {
    const ticketsToReserve = prompt('Enter number of tickets:', '1');
    if (ticketsToReserve !== null) {
      const numTickets = parseInt(ticketsToReserve, 10);
  
      // Fetch current train data
      const trainDoc = doc(db, 'trains', trainId);
      const trainSnapshot = await getDoc(trainDoc);
      if (!trainSnapshot.exists()) {
        alert('Train not found');
        return;
      }
      const trainData = trainSnapshot.data() as Train;
  
      // Check if there are enough seats available
      if (trainData.seatsAvailable < numTickets) {
        alert('Not enough seats available');
        return;
      }
  
      // Update seatsAvailable in the train data
      await updateDoc(trainDoc, {
        seatsAvailable: trainData.seatsAvailable - numTickets,
      });
  
      const reservationData = {
        email, // Replace with actual user email
        referenceNo: generateReferenceNo(),
        fromCity,
        toCity,
        trainId,
        numTickets,
        dateTime: new Date().toISOString(),
      };
      const docRef = doc(collection(db, 'reservations'), reservationData.referenceNo);
      await setDoc(docRef, reservationData);
      alert('Reservation successful!');
    }
  };

  const generateReferenceNo = (): string => {
    // Generate a reference number here, for example:
    return 'REF' + Math.floor(Math.random() * 1000000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmitSearch}>
        <Card>
          <CardHeader subheader="search your desired train" title="Search" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
              <FormControl fullWidth>
                <InputLabel>From City</InputLabel>
                <OutlinedInput label="From City" name="city" value={fromCity} onChange={(e) => { setFromCity(e.target.value) }} />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>To City</InputLabel>
                <OutlinedInput label="To City" name="toCity" type="city" value={toCity} onChange={(e) => { setToCity(e.target.value) }} />
              </FormControl>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained">Search</Button>
          </CardActions>
        </Card>
      </form>
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
          <TableCell>Actions</TableCell>
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
            <TableCell>
              <Button onClick={() => handleReserve(train.id)}>Reserve</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
