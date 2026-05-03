import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { Customer, CustomerData } from '../types';
import CustomerForm from "./CustomerForm";
import EditIcon from '@mui/icons-material/Edit';

type EditCustomerProps = {
  customer: CustomerData;
  handleUpdate: (url: string, updateCustomer: Customer) => void;
}

export default function EditCustomer(props: EditCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  })

  const handleClickOpen = () => {
    setCustomer({
      id: props.customer.id,
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone

    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    props.handleUpdate(props.customer._links.self.href, customer);
    handleClose();
  };

  return (
    <>
      <Button size="small" onClick={handleClickOpen}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );


}
