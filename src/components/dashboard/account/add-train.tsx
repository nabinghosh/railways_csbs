'use client';

import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';
import { Select, MenuItem } from '@mui/material';


export function AddTrain(): React.JSX.Element {
  const [trainNo, setTrainNo] = useState('');
  const [trainName, setTrainName] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState(''); // Changed variable name here
  const [trainType, setTrainType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [destinationTime, setDestinationTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    // const [Message, setMessage] = useState('Data Saved');


    // Extract form data
    const formData = new FormData(event.target as HTMLFormElement);
    const trainNo1 = formData.get('trainNo') as string;
    const trainName1 = formData.get('train') as string;
    const fromCity1 = formData.get('city') as string;
    const toCity1 = formData.get('toCity') as string;
    const seatsAvailable1 = formData.get('seatsAvailable') as string; // Changed variable name here
    const trainType1 = formData.get('trainType') as string;
    const frequency1 = formData.get('frequency') as string;
    const departureTime1 = formData.get('departureTime') as string;
    const destinationTime1 = formData.get('destinationTime') as string;
    const ticketPrice1 = formData.get('ticketPrice') as string; // Added this line


    // Construct train data object
    const trainData = {
      trainNo: trainNo1,
      trainName: trainName1,
      fromCity: fromCity1,
      toCity: toCity1,
      seatsAvailable: seatsAvailable1,
      trainType: trainType1,
      frequency: frequency1,
      departureTime: departureTime1,
      destinationTime: destinationTime1,
      ticketPrice: ticketPrice1,
    };

    // Save data to Firestore
    try {
      await setDoc(doc(db, "trains", trainName), trainData);
      // Optionally, reset the form fields after successful submission
      setTrainNo('');
    setTrainName('');
    setFromCity('');
    setToCity('');
    setSeatsAvailable('');
    setTrainType('');
    setFrequency('');
    setDepartureTime('');
    setDestinationTime('');
    setSuccessMessage('Data Saved');
    // Remove success message after 3 seconds
    setTimeout(() => { setSuccessMessage(''); }, 3000);
      event.currentTarget.reset();
    } catch (error) {
      // console.error("Error saving train details:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Add Train Details" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Train Number</InputLabel>
                <OutlinedInput label="Train Number" name="trainNo" value={trainNo} onChange={(e) => { setTrainNo(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Train Name</InputLabel>
                <OutlinedInput label="Train name" name="train" value={trainName} onChange={(e) => { setTrainName(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>From City</InputLabel>
                <OutlinedInput label="From City" name="city" value={fromCity} onChange={(e) => { setFromCity(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>To City</InputLabel>
                <OutlinedInput label="To City" name="toCity" type="text" value={toCity} onChange={(e) => { setToCity(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Seats Available</InputLabel>
                <OutlinedInput label="Seats Available" name="seatsAvailable" value={seatsAvailable} onChange={(e) => { setSeatsAvailable(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Train Type</InputLabel>
                <Select
                  label="Train Type"
                  name="trainType"
                  value={trainType}
                  onChange={(e) => { setTrainType(e.target.value) }}
                >
                  <MenuItem value="Express">Express</MenuItem>
                  <MenuItem value="Mail">Mail</MenuItem>
                  <MenuItem value="Slow">Slow</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Frequency</InputLabel>
                <Select
                  label="Frequency"
                  name="frequency"
                  value={frequency}
                  onChange={(e) => { setFrequency(e.target.value) }}
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Departure Time</InputLabel>
                <OutlinedInput label="Departure Time" name="departureTime" type="time" value={departureTime} onChange={(e) => { setDepartureTime(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Destination Time</InputLabel>
                <OutlinedInput label="Destination Time" name="destinationTime" type="time" value={destinationTime} onChange={(e) => { setDestinationTime(e.target.value) }} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Ticket Price</InputLabel>
                <OutlinedInput label="Ticket Price" name="ticketPrice" type="number" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">Save details</Button>
        </CardActions>
        {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}
      </Card>
    </form>
  );
}