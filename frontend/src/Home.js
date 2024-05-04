import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
 
export default function Home () {
    const [events, setEvents] = useState([])

    const HandleLogIn = () =>{
        if (localStorage.getItem["token"] !== null) {
            delete localStorage["token"];
        }
    }
    
    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/`,  {params: {token: localStorage["token"], }});
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
    let today = new Date();

    if (events[1]) {
        console.log(new Date(events[1]["registration_start"]) > new Date())
    // console.log("dalo by sa", estart.getTime() < today.getTime())
    console.log(events[1])}
    
    const myList = events.map((item) => <div className="event">
        <h2>{item.name}</h2>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
            {!item.registered && item.registration_end != null && (item.registration_start == null || new Date(item.registration_start) <= new Date()) && <Button 
                disabled={!loggedin || item.registered} 
                href={`/event_registration/${item.id}`} 
            >Zaregistrovať sa (do {item.registration_end.substring(0,10)})</Button>}
            {!loggedin && item.registration_end != null && (item.registration_start == null || new Date(item.registration_start) < new Date()) && <a href="/login" className='info'>Najskôr sa musíte prihlásiť</a>}
            {item.registered && <div className="success">Na túto akciu ste zaregistrovaný</div>}
            {item.registration_start != null && new Date(item.registration_start) > new Date() && <div className="info"> Registrácia od: {item.registration_start.substring(0,10)} </div>}
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
            <Menu />
            <div className="btn">
                <Button href={adr} onClick={HandleLogIn}>{txt}</Button>
                {(localStorage["token"] == null) ? (<Button href='/registration'> Zaregistrovať sa</Button>) : (<div></div>)}
            </div>
            <div className='log'>
                <p>{welcome}</p>
            </div>
            {myList}
        </div>
    </>)
}
