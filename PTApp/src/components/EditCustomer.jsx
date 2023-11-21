import { useState } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//Customerdata and fetchCustomers as props
export default function EditCustomer({ customerdata, fetchCustomers }) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: '',
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setCustomer({
            firstname: customerdata.firstname,
            lastname: customerdata.lastname,
            streetaddress: customerdata.streetaddress,
            postcode: customerdata.postcode,
            city: customerdata.city,
            email: customerdata.email,
            phone: customerdata.phone,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        fetch(customerdata.links[0].href, {
            method: 'PUT',
            headers: { 'Content-type':'application/json' },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Error in edit: " + response.statusText);

            fetchCustomers();

        })
        .catch(err => console.error(err))

        handleClose();
    }

    return(
        <>
            <Tooltip title="Edit customer">
                <IconButton onClick = {handleClickOpen}>
                    <EditIcon color="primary" ></EditIcon>
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Customer</DialogTitle>
                <DialogContent>
                <TextField
                    margin="dense"
                    label="First Name"
                    value={customer.firstname}
                    onChange={e => setCustomer({...customer, firstname: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    value={customer.lastname}
                    onChange={e => setCustomer({...customer, lastname: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Street address"
                    value={customer.streetaddress}
                    onChange={e => setCustomer({...customer, streetaddress: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Postcode"
                    value={customer.postcode}
                    onChange={e => setCustomer({...customer, postcode: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="City"
                    value={customer.city}
                    onChange={e => setCustomer({...customer, city: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    label="Email"
                    value={customer.email}
                    onChange={e => setCustomer({...customer, email: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                 <TextField
                    margin="dense"
                    label="Phone"
                    value={customer.phone}
                    onChange={e => setCustomer({...customer, phone: e.target.value })}
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        
        </>
    );
}