import { useEffect, useState } from "react";
import type { Training, TrainingData } from "../types";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddTraining from "./AddTraining";
import { fetchTraining, saveTraining } from "../trainingapi";


function TrainingList() {

    const [training, setTraining] = useState<TrainingData[]>([]);

    const columns: GridColDef[] = [
        { field: "date", headerName: "Date" },
        { field: "duration", headerName: "Duration" },
        { field: "activity", headerName: "Activity" },
        { field: "customer", headerName: "Customer name" },
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
        fetchTraining()
            .then(data => setTraining(data._embedded.trainings))
            .catch(err => console.error(err))
    }


    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {     // trainingapi toimimaan
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
        saveTraining(training)
            .then(() => getTraining())
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getTraining();
    }, []);



    return (
        <>
            <Stack sx={{ mt: 2, mb: 2 }} direction="row">
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