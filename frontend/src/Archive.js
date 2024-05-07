import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
 
export default function Archive () {
    const [events, setEvents] = useState([])
    
    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/archive`,  {params: {token: localStorage["token"], }});
            setEvents(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
      }, []);
    
    let loggedin = false;
    if (localStorage["token"] != null) {
        loggedin = true;
    }
    const myList = events.map((item) => <div className="event">
        <Button href={`/event_info/${item.id}`} > <h2>{item.name}</h2> </Button>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
        </div>)

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            {myList}
        </div>
    </>)
}
