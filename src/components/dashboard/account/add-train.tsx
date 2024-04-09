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
import Grid from '@mui/material/Unstable_Grid2';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';

export function AddTrain(): React.JSX.Element {
  const [trainName, setTrainName] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState(Number);
  const [ticketPriceEconomy, setTicketPriceEconomy] = useState(Number);
  const [ticketPriceBusiness, setTicketPriceBusiness] = useState(Number);
  const [ticketPriceFirstClass, setTicketPriceFirstClass] = useState(Number);

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

    // Save data to Firestore
    try {
      await setDoc(doc(db, "trains", trainName), trainData);
      // Optionally, reset the form fields after successful submission
      event.currentTarget.reset();
    } catch (error) {
      // console.error("Error saving train details:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Delete Train Details" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Train Name</InputLabel>
                <OutlinedInput label="Train name" name="train" value={trainName} onChange={(e) => { setTrainName(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Seats Available</InputLabel>
                <OutlinedInput defaultValue="60" label="Seats Available" value={seatsAvailable} onChange={(e) => { setSeatsAvailable(Number(e.target.value)) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>From City</InputLabel>
                <OutlinedInput label="From City" name="city" value={fromCity} onChange={(e) => {setFromCity(e.target.value)}} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>To City</InputLabel>
                <OutlinedInput label="To City" name="toCity" type="city" value={toCity} onChange={(e) => {setToCity(e.target.value)}} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Ticket Price Economy</InputLabel>
                <OutlinedInput defaultValue="400" label="Ticket Price Economy" value={ticketPriceEconomy} onChange={(e) => {setTicketPriceEconomy(e.target.value ? Number(e.target.value) : 0)}} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Ticket Price Business</InputLabel>
                <OutlinedInput defaultValue="800" label="Ticket Price Business" value={ticketPriceBusiness} onChange={(e) => {setTicketPriceBusiness(Number(e.target.value))}} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Ticket Price First Class</InputLabel>
                <OutlinedInput defaultValue="1200" label="Ticket Price First Class" value={ticketPriceFirstClass} onChange={(e) => {setTicketPriceFirstClass(Number(e.target.value))}} />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
