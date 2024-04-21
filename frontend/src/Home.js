import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'


export default function Home () {
    const [events, setEvents] = useState([])

    const HandleLogIn = () =>{
        if (localStorage.getItem["token"] !== null) {
            delete localStorage["token"];
        }
    }
    
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
    let txt = "Odhlásiť sa";
    let adr = "/"
    let welcome = ""
    if (localStorage["token"] != null) {
        welcome = "Ste prihlásený ako " + localStorage["username"];
    }
    if (localStorage["token"] == null) {
        txt = "Prihlásiť sa";
        adr = "/login";
    }
    return (<>
        <div>
            <div class="btn">
                <Button href={adr} onClick={HandleLogIn}>{txt}</Button>
            </div>
            <div class='log'>
                <p>{welcome}</p>
            </div>
            {myList}
        </div>
    </>)
}
