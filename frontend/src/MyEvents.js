import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
 
export default function MyEvents () {
    const [events, setEvents] = useState([])
    
    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/myevents`,  {params: {token: localStorage["token"], }});
            setEvents(data)
        } catch (error) {
            if (error?.response?.data.message) {
                alert(error.response.data.message)
            }
            else {
                alert(error)
            }
        }
    }

    useEffect(() => {
        getData()
      }, []);

    const myList = events.map((item) => <div className="event">
        <Button href={`/event_info/${item.id}`} > <h2>{item.name}</h2> </Button>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
            <Button href={`/feedback/event/${item.id}`} > Feedback </Button>
        </div>)

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            {myList}
        </div>
    </>)
}
