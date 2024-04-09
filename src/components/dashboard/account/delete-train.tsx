'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
// import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';


export function DeleteTrain(): React.JSX.Element {
  const [trainName, setTrainName] = React.useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      await deleteDoc(doc(db, 'trains', trainName));
      // console.log('Train deleted successfully');
    } catch (error) {
      // console.error('Error deleting train:', error);
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
                <OutlinedInput label="Train name" name="train" value={trainName} onChange={(e) => {setTrainName(e.target.value)}} />
              </FormControl>
            </Grid>
            {/* <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>From City</InputLabel>
                <OutlinedInput label="From City" name="city" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>To City</InputLabel>
                <OutlinedInput label="To City" name="To City" type="city" />
              </FormControl>
            </Grid> */}
            
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" type="submit">Delete</Button>
        </CardActions>
      </Card>
    </form>
  );
}
