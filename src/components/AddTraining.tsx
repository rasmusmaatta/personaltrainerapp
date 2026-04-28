import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import type { Training, Customer, CustomerData } from '../types';
import { fetchCustomer } from '../customerapi';

type AddTrainingProps = {
    handleAdd: (training: Training) => void;
}


export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [training, setTraining] = useState<Training>({
        id: "",
        date: dayjs().format('DD-MM-YYYY'),
        duration: 0,
        activity: "",
        customer: {
            id: 0,
            firstname: "",
            lastname: "",
            streetaddress: "",
            postcode: "",
            city: "",
            email: "",
            phone: ""
        }
    });

    useEffect(() => {
        fetchCustomer()
            .then((data: any) => {
                const customerList = data._embedded.customers.map((cust: CustomerData) => {
                    const { _links, ...customer } = cust;
                    return customer;
                });
                setCustomers(customerList);
            })
            .catch(error => console.error("Error fetching customers:", error));
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCustomer(null);
        setTraining({
            id: "",
            date: dayjs().format('DD-MM-YYYY'),
            duration: 0,
            activity: "",
            customer: {
                id: 0,
                firstname: "",
                lastname: "",
                streetaddress: "",
                postcode: "",
                city: "",
                email: "",
                phone: ""
            }
        });
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={training.date ? dayjs(training.date) : null}
                            onChange={(newValue) => {
                                const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
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
                    <Autocomplete
                        options={customers}
                        getOptionLabel={(option) => `${option.firstname} ${option.lastname}`}
                        value={selectedCustomer}
                        onChange={(event, newValue) => {
                            if (newValue) {
                                setSelectedCustomer(newValue);
                                setTraining({ ...training, customer: newValue });
                            }
                        }}
                        renderInput={(params) => <TextField {...params} label="Customer" variant="standard" required />}
                        fullWidth
                        sx={{ mt: 2 }}
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