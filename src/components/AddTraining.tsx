import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { Training } from '../types';

type AddTrainingProps = {
    data: any;
    handleSubmit: (training: Training) => void;
}


export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<Omit<Training, 'customer'>>({
        id: 0,
        date: dayjs().format('DD-MM-YYYY'),
        duration: 0,
        activity: "",
    });


      
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
       
    };

    const saveTraining = () => {
        const newTraining: Training ={
            id: training.id,
            activity: training.activity,
            duration: training.duration,
            date: training.date,
            customer: props.data._links.customer.href,
        }
        props.handleSubmit(newTraining);
        setTraining({
            date: dayjs().format('DD-MM-YYYY'),
            duration: 0,
            activity: "",
        } as Omit<Training, 'customer'>);
        setOpen(false);
    };

    const handleSubmit = () => {
        saveTraining();
    };


    return (
        <>
            <Button onClick={handleClickOpen}>
               <AddBoxIcon />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={training.date ? dayjs(training.date, 'DD-MM-YYYY') : null}
                            onChange={(newValue) => {
                                const formattedDate = newValue ? newValue.format('DD-MM-YYYY') : '';
                                setTraining({ ...training, date: formattedDate });
                            }}
                            slotProps={{ textField: { fullWidth: true, variant: "standard" } }}
                        />
                    </LocalizationProvider>
                    <TextField
                        required
                        margin="dense"
                        label="Duration"
                        type="number"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: parseInt(e.target.value) || 0 })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Activity"
                        value={training.activity}
                        onChange={e => setTraining({ ...training, activity: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                   
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}