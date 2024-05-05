import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import { useParams } from 'react-router-dom'
 
export default function EventInfo(props) {
    const [event, setEvent] = useState()
    const id = useParams()["id"]

    const HandleLogIn = () =>{
        if (localStorage.getItem["token"] !== null) {
            delete localStorage["token"];
        }
    }

    const HandleProgramReg = (id) =>{
        axios.post(`http://${hostname}:8000/api/register_program`, {
            token: localStorage["token"],
            id: id,
        }).then(function ({data}) {
            window.location.reload() 
        }).catch(function (error) {
            if (error.response?.data?.message !== null) {
                alert(error.response.data.message)
            } else {alert(error)};
        });
    }

    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/programs/${id}`, { params:
                {token: localStorage["token"]}
            })
            setEvent(data[0])
        } catch (error) {
            if (error?.response?.data?.message) {
                alert(error.response.data.message)
            } else {
                alert(error);
            }
        }
    }

    useEffect(() => {
        getData()
      }, []);
    
    
    const myList = []
    let loggedin = false;
    if (localStorage["token"] != null) {
        loggedin = true;
    }
    if (event?.programs != null) {
        myList.push(event.programs.map((item) => <div className="event">
        <h2>{item.name}</h2>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
            {!item.registered && item.registration_end != null && (item.registration_start == null || new Date(item.registration_start) <= new Date()) && <Button 
                disabled={!loggedin || item.registered} 
                onClick={() => HandleProgramReg(item.id)} 
            >Zaregistrovať sa (do {item.registration_end.substring(0,10)})</Button>}
            {!loggedin && item.registration_end != null && (item.registration_start == null || new Date(item.registration_start) < new Date()) && <a href="/login" className='info'>Najskôr sa musíte prihlásiť</a>}
            {item.registered && <div className="success">Na tento program ste zaregistrovaný</div>}
            {item.registration_start != null && new Date(item.registration_start) > new Date() && <div className="info"> Registrácia od: {item.registration_start.substring(0,10)} </div>}
                
        </div>))
    } 
    
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
    console.log(event)

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
           {event != null && <div className="event">
            <h2>{event.name}</h2>
        {event.more_info != null && event != "" && 
            <p>{event.more_info}</p>
        }
            <p>Začiatok: {event.start.substring(0,10)} </p>
            <p>Koniec: {event.end.substring(0, 10)}</p>
            {!event.registered && event.registration_end != null && (event.registration_start == null || new Date(event.registration_start) <= new Date()) && <Button 
                disabled={!loggedin || event.registered} 
                href={`/event_registration/${event.id}`} 
            >Zaregistrovať sa (do {event.registration_end.substring(0,10)})</Button>}
            {!loggedin && event.registration_end != null && (event.registration_start == null || new Date(event.registration_start) < new Date()) && <a href="/login" className='info'>Najskôr sa musíte prihlásiť</a>}
            {event.registered && <div className="success">Na túto akciu ste zaregistrovaný</div>}
            {event.registration_start != null && new Date(event.registration_start) > new Date() && <div className="info"> Registrácia od: {event.registration_start.substring(0,10)} </div>}
                </div>}
            {myList}
        </div>
    </>)
}
