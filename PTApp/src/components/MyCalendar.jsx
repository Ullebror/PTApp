import { useState, useEffect } from 'react';

import {
    Calendar,
    Views,
    dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';



export default function MyCalendar() {  
   const localizer = dayjsLocalizer(dayjs);

   const [events, setEvents] = useState([]);
    

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
        .then(responseData => setEvents(
            responseData.map((appointment) => {
                return {
                    title: appointment.activity + "/" + appointment.customer.firstname + " " + appointment.customer.lastname,
                    start: dayjs(appointment.date).toDate(),
                    end: dayjs(appointment.date).add(appointment.duration, 'minutes').toDate(),
                }
            
            })
        ))
        .catch(err => console.error(err))
        
    }
    
    useEffect(() => {
        console.log(events)
    },[events])
 
    return (
        <div>
            <Calendar
                localizer={localizer}
                defaultView={Views.WEEK}
                defaultDate={Date.now()}
                min = {new Date(2011, 0, 1, 7, 0, 0, 567)}
                max = {new Date(3000, 0, 1, 20, 0, 0, 567)}
                events={events}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 800 }}
                views={['day', 'week', 'month']}
            />
        </div>

    );
    
    
    

}