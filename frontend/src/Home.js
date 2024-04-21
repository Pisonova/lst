import axios from 'axios'
import { useState } from 'react'
import "./Register.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


export default function Home () {
    const [events, setEvents] = useState([])
    
    axios.get('/api/')
        .then(function (response) {
            console.log(response);
            response.data.forEach(element => {
                console.log(element)
                const next_events = events.push(element);
                setEvents(events, next_events)
            });
            console.log(events);
        })
        .catch(function (error) {
            console.log(error);
        })

        
    return (<></>)
}


