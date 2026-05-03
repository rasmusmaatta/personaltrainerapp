import { useEffect, useState } from "react";
import type { TrainingData } from "../types";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import { fetchTraining, deleteTraining } from "../trainingapi";


function TrainingList() {

    const [training, setTraining] = useState<TrainingData[]>([]);

    const columns: GridColDef[] = [
        {
            field: "date",
            width: 150,
            headerName: "Date",
            valueFormatter: (value: string) => {
                if (!value) return "";
                return dayjs(value).format('DD-MM-YYYY');
            }
        },
        { 
            field: "duration",
            width: 150,
            headerName: "Duration (Minutes)" 
        },
        { field: "activity", headerName: "Activity" },
        {
            field: "customer",
            headerName: "Customer",
            width: 200,
            valueGetter: (value: { firstname: string, lastname: string } | null) => {
                if (!value) return "";
                return `${value.firstname} ${value.lastname}`;
            }
        },
        {
            field: "id",
            headerName: "",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.value as string)}>
                    <DeleteIcon />
                </Button>
        }
    ]

    const getTraining = () => {
        fetchTraining()
            .then(data => {
                const trainings = Array.isArray(data) ? data : data._embedded?.trainings || data._embedded?.training || [];
                setTraining(trainings);
            })
            .catch(err => console.error(err))
    }


    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            deleteTraining(url)
                .then(() => getTraining())
                .catch(err => console.error(err));
        }
    }



    useEffect(() => {
        getTraining();
    }, []);



    return (
        <>
            <Stack sx={{ mt: 2, mb: 2 }} direction="row">
            </Stack>
            <div style={{ width: "90%", height: 500, margin: "auto" }}>
                <DataGrid
                    columns={columns}
                    rows={training}
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )
}



export default TrainingList;