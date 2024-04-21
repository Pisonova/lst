import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


export default function Home () {
    const [events, setEvents] = useState([])
    
    const getData =async ()=> {
        try {
            const {data} = await axios.get('/api/');
            setEvents(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
      }, []);
    
    const myList = events.map((item) => <div className="event">
        <h2>{item.name}</h2>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
        </div>)
    return (<>
        <div>
            {myList}
        </div>
    </>)
}
