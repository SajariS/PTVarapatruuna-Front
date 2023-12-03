import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

import "react-big-calendar/lib/css/react-big-calendar.css";

export default function TrainingCalendar() {
    const [events, setEvents ] = useState([]);
    const localizer = dayjsLocalizer(dayjs);

    useEffect(() => {
        fetchTraining();
    }, [])

    const fetchTraining= () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                throw new Error("Error in fetch:" + response.statusText);
            }
        })
        .then(data => {
            const events = [];
            data.forEach(training => {
                if(training.customer !== null) {
                    const startDate = dayjs(training.date);
                    console.log(startDate);
                    const endDate = startDate.add(training.duration, 'minute');
                    const customer = training.customer.firstname;
                    const event = {
                        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
                        customer: customer,
                        start: new Date(startDate.year(), startDate.month(), startDate.date(), startDate.hour(), startDate.minute(), 0),
                        end: new Date(endDate.year(), endDate.month(), endDate.date(), endDate.hour(), endDate.minute(), 0)
                    }
                    events.push(event)
                }
            });
            setEvents(events);
        })
        .catch(err => console.error(err))
    };

    return(
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
            />
        </div>
    )
}