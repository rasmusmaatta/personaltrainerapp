import { useState } from "react";
import type { Training, TrainingData } from "../types";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddTraining from "./AddTraining";


function TrainingList() {

    const [training, setTraining] = useState<TrainingData[]>([]);

    const columns: GridColDef[] = [
        { field: "date", headerName: "Date" },
        { field: "duration", headerName: "Duration" },
        { field: "activity", headerName: "Activity" },
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

    const getTraining = () => {
        fetch(import.meta.env.VITE_API_URL + "/trainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers")
            return response.json();
        })
        .then(data => setTraining(data._embedded.customers))
        .catch(err => console.error(err))
    }
    

        const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting");

                    return response.json();
                })
                .then(() => getTraining())
                .catch(err => console.error(err));
        }
    }

        const handleAdd = (training: Training) => {
            fetch(import.meta.env.VITE_API_URL + "/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application-json"
                },
                body: JSON.stringify(training)
            })
            .then(response => {
                if(!response.ok)
                    throw new Error("Error when adding new customer");
    
                return response.json();
            })
            .then(() => getTraining())
            .catch(err => console.error(err))
        }



    return (
        <>
            <Stack sx={{mt: 2, mb: 2}} direction = "row">
            <AddTraining handleAdd={handleAdd} />
            </Stack>
            <div style={{ width: "90%", height: 500, margin: "auto" }}>
                <DataGrid
                    columns={columns}
                    rows={training}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}


export default TrainingList;