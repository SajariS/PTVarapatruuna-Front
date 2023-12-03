import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
    const [sessions, setSessions] = useState([]);
    const url = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetchTraining();
    }, []);

    const [columnDefs] = useState([
        {field: 'activity', sortable: true, filter: true},
        {field: 'duration', sortable: true, filter: true},
        {field: 'customer.lastname', headerName: 'customer', sortable: true, filter: true},
        {field: 'date', sortable: true, filter: true},
        {
            cellRenderer: params => <Button size="small" onClick={() => deleteTraining(params.data.id)}>
                Delete
            </Button>,
            width: 120
        }

    ]);

    const fetchTraining= () => {
        fetch(url + 'gettrainings')
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error in fetch:" + response.statusText);
            }
        })
        .then(data => {
            data.forEach(training => {
                training.date = dayjs(training.date).format('DD.MM.YYYY HH:mm');
            });
            setSessions(data);
        })
        .catch(err => console.error(err))
    };

    const deleteTraining = (id) => {
        if (window.confirm("Are you sure?")) {
            fetch(url + 'api/trainings/' + id, {
                method: 'DELETE'
            })
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error in delete: " + response.statusText);
                }
                fetchTraining();
            })
            .catch(err => console.error(err));
        }
    };

    return(
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Trainings</Typography>
                </Toolbar>
            </AppBar>
            <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
                <AgGridReact
                rowData={sessions}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                />
            </div>
        </Container>
    );
}