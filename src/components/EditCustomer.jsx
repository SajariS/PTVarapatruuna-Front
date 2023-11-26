import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import CustomerDialog from './CustomerDialog';

export default function EditCustomer({fetchCustomers, data}) {

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

    const handleOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            phone: data.phone,
            streetaddress: data.streetaddress,
            postcode: data.postcode,
            city: data.city
        });
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleChange = (e) => {
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    const saveCustomer = () => {
        fetch(data.links[0].href, {
            method: 'PUT',
            headers: { 'Content-type':'application/json'},
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when editing customer: " + response.statusText);
            }
            fetchCustomers();
        })
        .catch(err => console.error(err))

        handleClose();
    }

    return(
        <div>
            <Button size="small" onClick={handleOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit</DialogTitle>
                <CustomerDialog customer={customer} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}