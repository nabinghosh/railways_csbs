'use client'
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { collection, doc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

interface Train {
  id: string;
  trainNo: string;
  trainName: string;
  fromCity: string;
  toCity: string;
  seatsAvailable: string;
  trainType: string;
  frequency: string;
  departureTime: string;
  destinationTime: string;
}

export default function DeleteTrain(): React.JSX.Element  {
  const [trains, setTrains] = useState<Train[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [newTrain, setNewTrain] = useState<Partial<Train>>({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'trains'), (snapshot) => {
      const newTrains: Train[] = snapshot.docs.map((docs) => {
        const data = docs.data() as Train;
        return {
          ...data,
        };
      });
      setTrains(newTrains);
      setLoading(false);
    }, (_) => {
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const deleteTrain = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, 'trains', id));
  };

  const startEdit = (train: Train): void => {
    setEditId(train.id);
    setNewTrain(train);
  };

  const updateTrain = async (): Promise<void> => {
    if (editId && newTrain) {
      const trainRef = doc(db, 'trains', editId);
      await updateDoc(trainRef, newTrain);
      setEditId(null);
      setNewTrain({});
    }
  };

  const handleChange = (field: keyof Train, value: string): void => {
    setNewTrain(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Train No</TableCell>
            <TableCell>Train Name</TableCell>
            <TableCell>From City</TableCell>
            <TableCell>To City</TableCell>
            <TableCell>Seats Available</TableCell>
            <TableCell>Train Type</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Departure Time</TableCell>
            <TableCell>Destination Time</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trains.map((train) => (
            <TableRow key={train.id}>
              {editId === train.id ? (
                <>
                  <TableCell>
                    <TextField value={newTrain.trainNo} onChange={(e) => { handleChange('trainNo', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.trainName} onChange={(e) => { handleChange('trainName', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.fromCity} onChange={(e) => { handleChange('fromCity', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.toCity} onChange={(e) => { handleChange('toCity', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.seatsAvailable} onChange={(e) => { handleChange('seatsAvailable', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.trainType} onChange={(e) => { handleChange('trainType', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.frequency} onChange={(e) => { handleChange('frequency', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.departureTime} onChange={(e) => { handleChange('departureTime', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <TextField value={newTrain.destinationTime} onChange={(e) => { handleChange('destinationTime', e.target.value); }} />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={updateTrain}>
                      Save
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{train.trainNo}</TableCell>
                  <TableCell>{train.trainName}</TableCell>
                  <TableCell>{train.fromCity}</TableCell>
                  <TableCell>{train.toCity}</TableCell>
                  <TableCell>{train.seatsAvailable}</TableCell>
                  <TableCell>{train.trainType}</TableCell>
                  <TableCell>{train.frequency}</TableCell>
                  <TableCell>{train.departureTime}</TableCell>
                  <TableCell>{train.destinationTime}</TableCell>
                  <TableCell  sx={{ spacing:3 }}>
                    <Button variant="contained" color="primary" onClick={() => { startEdit(train); }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => deleteTrain(train.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
    </Card>
  );
}