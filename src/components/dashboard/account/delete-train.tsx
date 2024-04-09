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

// const states = [
//   { value: 'alabama', label: 'Alabama' },
//   { value: 'new-york', label: 'New York' },
//   { value: 'san-francisco', label: 'San Francisco' },
//   { value: 'los-angeles', label: 'Los Angeles' },
// ] as const;

export function DeleteTrain(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Delete Train Details" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Train Name</InputLabel>
                <OutlinedInput label="Train name" name="train" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
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
            </Grid>
            
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Delete</Button>
        </CardActions>
      </Card>
    </form>
  );
}
