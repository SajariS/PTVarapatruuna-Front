import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import dayjs from 'dayjs';

import TrainingDialog from './TrainingDialog';

export default function AddTraining({fetchCustomers, data}) {
    const [training, setTraining] = useState({
        date: dayjs(),
        duration: 0,
        activity: '',
        customer: data.links[0].href
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleChange = (e) => {
        setTraining({...training, [e.target.name]: e.target.value});
    };

    const handleDateChange = (newDate) => {
        setTraining({...training, date: newDate});
    }

    const formatDate = () => {
        setTraining({...training, date: training.date.toISOString()});
    };

    const saveTraining = () => {
        formatDate();
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify(training)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when adding training: " + response.statusText);
            }
            fetchCustomers();
        })
        .catch(err => console.error(err))

        handleClose();
    }

    return(
        <div>
            <Button size="small" onClick={handleOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training</DialogTitle>
                <TrainingDialog training={training} handleChange={handleChange} handleDateChange={handleDateChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );


}