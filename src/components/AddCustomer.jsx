import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import CustomerDialog from './CustomerDialog';

export default function AddCustomer({fetchCustomers}) {

    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });
    const [open, setOpen] = useState(false);
    const url = import.meta.env.VITE_API_URL;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleChange = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    };

    const saveCustomer = () => {
        fetch(url + 'api/customers', {
            method: 'POST',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when adding customer: " + response.statusText);
            }
            fetchCustomers();
        })
        .catch(err => console.error(err))

        handleClose();
    };

    return(
        <div>
            <Button variant='contained' color="success" onClick={handleOpen}>
                Add customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer</DialogTitle>
                <CustomerDialog customer={customer} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}