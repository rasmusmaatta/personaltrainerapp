import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import type { Training } from '../types';

type AddTrainingProps = {
    handleAdd: (training: Training) => void;
}


export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<Training>({
        date: "",
        duration: "",
        activity: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        props.handleAdd(training);
        handleClose();
    };


    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        margin="dense"
                        label="Date"
                        value={training.date}
                        onChange={e => setTraining({ ...training, date: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        label="Duration"
                        value={training.duration}
                        onChange={e => setTraining({ ...training, duration: e.target.value })}
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