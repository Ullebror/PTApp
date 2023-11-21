import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

//Uses customerdata as a prop to get the customers href URL.
export default function AddTraining({ customerdata }) {
    const [training, setTraining] = useState({
        date: '',
        duration: '',
        activity: '',
        customer: '',
    });

    
    const changeDateFunc = (date) => {
        setTraining({...training, date: date.toISOString()})
      }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setTraining({...training, customer: customerdata.links[1].href});
        setOpen(true);

    };
    
    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        setTraining({...training, customer: customerdata});
        console.log(training);
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(training)
        })
        .then(response => {
            if (!response.ok)
                throw new Error("Addition failed: " + response.statusText)

        })
        .catch(err => console.error(err))

        handleClose();
    }

    return(
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Tooltip title="Add training">
                <IconButton onClick = {handleClickOpen}>
                    <AddIcon color="primary" ></AddIcon>
                </IconButton>
            </Tooltip>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New Training</DialogTitle>
                    <DialogContent>
                    <DateTimePicker
                        format= 'DD.MM.YYYY HH:mm'
                        ampm = {false}
                        value={training.date}
                        onChange={(date) => changeDateFunc(date)}
                    />
                    <TextField
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={e => setTraining({...training, duration: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </LocalizationProvider>
        
        </>
    );

}