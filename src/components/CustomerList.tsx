import { useEffect, useState } from "react";
import type { Customer, CustomerData } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import  Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddCustomer from "./AddCustomer";


function CustomerList(){
    const [customer, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        {field: "firstname", headerName: "First name"},
        {field: "lastname", headerName: "Last name"},
        {field: "streetaddress", headerName: "Street address"},
        {field: "postcode", headerName: "Postcode"},
        {field: "city", headerName: "City"},
        {field: "email", headerName: "Email"},
        {field: "phone", headerName: "Phone"},
        {
            field: "_links.self.href",
            headerName: "",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) => 
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        }
    ]

    const getCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "customers" )
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers")
            return response.json();
        })
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting a customer");

                    return response.json();
                })
                .then(() => getCustomers())
                .catch(err => console.error(err));
        }
    }

    const handleAdd = (customer: Customer) => {
        fetch(import.meta.env.VITE_API_URL + "customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
        .then(response => {
            if(!response.ok)
                throw new Error("Error when adding new customer");

            return response.json();
        })
        .then(() => getCustomers())
        .catch(err => console.error(err))
    }
    

    useEffect(() => {
        getCustomers();
    }, []);

    return(
        <>
        <Stack sx={{mt: 2, mb: 2}} direction = "row">
            <AddCustomer handleAdd={handleAdd}/>
            </Stack>
            <div style={{ width: "90%", height: 500, margin: "auto" }}>
                <DataGrid
                    columns={columns}
                    rows={customer}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}

export default CustomerList;