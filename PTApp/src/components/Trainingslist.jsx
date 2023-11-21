import { useState, useEffect } from 'react';
import { AgGridReact } from "ag-grid-react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Trainingslist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    //Gets the values of customers first name and last name and combines them to one column in the table
    function fullNameGetter(params) {
        return params.data.customer.firstname + " " + params.data.customer.lastname;
    }

    //calls the API to delete one training
    const deleteTraining = (id) => {
        if (window.confirm("Are you sure?")) {
            const url = 'https://traineeapp.azurewebsites.net/api/trainings/' + id
            fetch(url, {method: 'DELETE'})
            .then(response => {
                if(response.ok){
                    setOpen(true);
                    fetchTrainings();
                } else {
                    throw new Error("error in deletion: " + response.statusText);
                }
            })
            .catch(err => console.error(err));
        }
    }

    //creates the column definitions.
    const [columnDefs] = useState([
        {   
            field: 'date', 
            sortable: true, 
            filter: true,
            //formats the value in the date column to that format
            valueFormatter: function (params) {
            return dayjs(params.value).format('DD.MM.YYYY HH:mm')
            },
        },
        {
            field: 'duration',
            sortable: true,
            filter: true, 
            width: 120,
        },
        {
            field: 'activity',
            sortable: true,
            filter: true, 
        },
        {
            field: 'firstname&lastname',
            headerName:'Customer',
            valueGetter: fullNameGetter,
            sortable: true,
            filter: true,
        },
        {
            cellRenderer: params => 
                <Tooltip title="Delete">
                    <IconButton onClick={() => deleteTraining(params.data.id.toString())}>
                        <DeleteIcon color="warning" ></DeleteIcon>
                    </IconButton>
                </Tooltip>,
             width: 90
        },
        
    ]);

    useEffect(() => {
        fetchTrainings();
    },[])

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if (response.ok)
                return response.json();

                throw new Error("Something went wrong: " + response.statusText);
        })
        .then(responseData => setTrainings(responseData))
        .catch(err => console.error(err))
    }
    

    return(
        <LocalizationProvider dateAdapter={AdapterDayjs} >
            <div className="" color="primary"> Search dates in YYYY-MM-DD format </div>
            
            <div className='ag-theme-material' style={{ width: '100%', height: 600}}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationAutoPageSize={true}

                 />

            </div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                message="Training deleted succesfully"
            />
        </LocalizationProvider >
    );
}

export default Trainingslist;