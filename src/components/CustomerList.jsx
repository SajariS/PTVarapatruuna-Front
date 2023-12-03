import { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const gridRef = useRef();
    useEffect(() => {
        fetchCustomers();
    }, []);
    const url = import.meta.env.VITE_API_URL;

    const [columnDefs] = useState([
        {field: 'firstname', sortable: true, filter: true},
        {field: 'lastname', sortable: true, filter: true},
        {field: 'streetaddress', sortable: true, filter: true},
        {field: 'postcode', sortable: true, filter: true},
        {field: 'city', sortable: true, filter: true},
        {field: 'email', sortable: true, filter: true},
        {field: 'phone', sortable: true, filter: true},
        {
            cellRenderer: params => <AddTraining fetchCustomers={fetchCustomers} data={params.data} />
        },
        {
            cellRenderer: params => <EditCustomer fetchCustomers={fetchCustomers} data={params.data} />,
            width: 120
        },
        {
            cellRenderer: params => <Button size="small" onClick={() => deleteCustomer(params.data.links[0].href)}>
                Delete
            </Button>,
            width: 120
        }
    ]);

    const fetchCustomers = () => {
        fetch(url + 'api/customers')
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error in fetch:" + response.statusText);
            }
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const deleteCustomer = (apiUrl) => {
        if (window.confirm("Are you sure?")) {
            fetch(apiUrl, {method: 'DELETE'})
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error in delete: " + response.statusText);
                }
                fetchCustomers();
            })
            .catch(err => console.error(err));
        }
    }

    const handleExport = () => {
        const exportableColumns = columnDefs.filter(column => !column.cellRenderer);
        const params = {
            fileName: 'customers.csv',
            columnKeys: exportableColumns.map(column => column.field)
            };

        gridRef.current.api.exportDataAsCsv(params);
    }

    return(
        <Container maxWidth="lg">
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant="h6">Customers</Typography>
                </Toolbar>
            </AppBar>
            <AddCustomer fetchCustomers={fetchCustomers} />
            <Button onClick={handleExport}>Export data</Button>
            <div className="ag-theme-material" style={{ width: '100%', height: 600}}>
                <AgGridReact
                ref={gridRef}
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                />
            </div>
        </Container>
    );
}

export default CustomerList;