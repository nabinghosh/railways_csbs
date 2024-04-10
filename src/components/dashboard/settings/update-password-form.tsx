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
import { doc, setDoc, updateDoc,  } from "firebase/firestore";
import {  auth, db } from '@/lib/firebase';

export function CreateReservation(): React.JSX.Element {
  const user = auth.currentUser;
  // const displayName = user?.displayName || '';
  const email = user?.email || '';
  // const [trainName, setTrainName] = useState('');
  const [ticket, setTicket] = useState(1);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  // const [seatsAvailable, setSeatsAvailable] = useState(Number);
  // const [ticketPriceEconomy, setTicketPriceEconomy] = useState(Number);
  // const [ticketPriceBusiness, setTicketPriceBusiness] = useState(Number);
  // const [ticketPriceFirstClass, setTicketPriceFirstClass] = useState(Number);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    

    // Extract form data
    const formData = new FormData(event.target as HTMLFormElement);
    const trainName1 = formData.get('train') as string;
    const fromCity1 = formData.get('city') as string;
    const toCity1 = formData.get('toCity') as string;
    const seatsAvailable1 = formData.get('seatsAvailable') ? parseInt(formData.get('seatsAvailable') as string, 10) : 60;
    const ticketPriceEconomy1 = formData.get('ticketPriceEconomy') ? parseInt(formData.get('ticketPriceEconomy') as string, 10) : 40;
    const ticketPriceBusiness1 = formData.get('ticketPriceBusiness') ? parseInt(formData.get('ticketPriceBusiness') as string, 10) : 80;
    const ticketPriceFirstClass1 = formData.get('ticketPriceFirstClass') ? parseInt(formData.get('ticketPriceFirstClass') as string, 10) : 120;
    // Construct train data object
    const trainData = {
      trainName: trainName1,
      fromCity: fromCity1,
      toCity: toCity1,
      seatsAvailable: seatsAvailable1,
      ticketPrices: {
        economy: ticketPriceEconomy1,
        business: ticketPriceBusiness1,
        firstClass: ticketPriceFirstClass1,
      },
    };
    const reservationData = {
      email,
      dateTime: Date.now(),
      trainData,
      tickets: trainData.seatsAvailable > ticket ? ticket : trainData.seatsAvailable,
    };
    const trainDocRef = doc(db, "trains", trainData.trainName); 
    const newSeatsAvailable = trainData.seatsAvailable - ticket;


    // Save data to Firestore
    try {
      await updateDoc(trainDocRef, { seatsAvailable: newSeatsAvailable });
      await setDoc(doc(db, "reservation", reservationData.email), reservationData);
      // Optionally, reset the form fields after successful submission
      event.currentTarget.reset();
    } catch (error) {
      // console.error("Error saving train details:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="search your desired train" title="Create New Reservation" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl fullWidth>
              <InputLabel>From City</InputLabel>
              <OutlinedInput label="From City" name="city" value={fromCity} onChange={(e) => {setFromCity(e.target.value)}} />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>To City</InputLabel>
              <OutlinedInput label="To City" name="toCity" type="city" value={toCity} onChange={(e) => {setToCity(e.target.value)}} />
            </FormControl>
            <FormControl fullWidth>
            <InputLabel>No of Tickets</InputLabel>
            <OutlinedInput label="Tickets" name="tickets" value={ticket} onChange={(e) => {setTicket(parseInt(e.target.value, 10))}} />
          </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button  type="submit" variant="contained">Book</Button>
        </CardActions>
      </Card>
    </form>
    
  </div>
  );
}
