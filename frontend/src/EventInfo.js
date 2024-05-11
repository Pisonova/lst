import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
import { useParams } from 'react-router-dom'
 
export default function EventInfo(props) {
    const [event, setEvent] = useState()
    const id = useParams()["id"]

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

    const HandleLogOut = (program) =>{
        axios.post(`http://${hostname}:8000/api/logout/program/${program.id}`, {
            token: localStorage["token"],
        }).then(function ({data}) {
            window.location.reload()
        }).catch(function (error) {
            if (error.response?.data?.message !== null) {
                alert(error.response.data.message)
            } else {alert(error)};
        });
    }

    const HandleELogOut = (evemt) =>{
        axios.post(`http://${hostname}:8000/api/logout/event/${event.id}`, {
            token: localStorage["token"],
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

    let linkstart = '/feedback/'
    let fb = "Feedback"
    if (localStorage["org"] == 'true') { 
        linkstart='/feedbacks/'
        fb = "Feedbacky od účastníkov" 
    }

    console.log(localStorage["org"])
    if (event?.programs != null) {
        console.log(event.programs)
        myList.push(event.programs.map((item) => <div className="event">
        <h2>{item.name}</h2>
        <h4>{item.program_type}</h4>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
            <div className="pReg">
            {event.registered && !item.registered && item.registration_end != null && (item.registration_start == null || new Date(item.registration_start) <= new Date()) && <Button 
                color='inherit'
                disabled={!loggedin || item.registered} 
                onClick={() => HandleProgramReg(item.id)} 
            >Zaregistrovať sa (do {item.registration_end.substring(0,10)})</Button>} </div>
            {!loggedin && item.registration_end != null && (item.registration_start == null || new Date(item.registration_start) < new Date()) && <a href="/login" className='info'>Najskôr sa musíte prihlásiť</a>}
            {item.registered && <div className="success">Na tento program ste zaregistrovaný</div>}
            {item.registration_start != null && new Date(item.registration_start) > new Date() && <div className="info"> Registrácia od: {item.registration_start.substring(0,10)} </div>}
            {item.registered && <Button href={linkstart + `program/${item.id}`}> {fb} </Button>}
            {item.registered && localStorage["org"] == "true" && <Button href={`/registered/program/${item.id}`}> Prihlásení používatelia </Button>}
            {item.registered && <div className='logOut'><Button color='inherit' onClick={() => HandleLogOut(item)}> Zrušiť registráciu </Button></div>}   
        </div>))
    } 

    return (<>
        <div>
            <Menu />
            <LoginLogic />
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
            {event.registered && <Button href={linkstart + `event/${event.id}`}> {fb} </Button>}
            {event.registered && localStorage["org"] == "true" && <Button href={`/registered/event/${event.id}`}> Prihlásení používatelia </Button>}
            {event.registered && <div className='logOut'><Button color='inherit' onClick={() => HandleELogOut(event)}> Zrušiť registráciu </Button></div>}
                </div>}
            {myList}
            {event != null && localStorage["org"] == "true" && event.registered && 
            <div className="event"> <Button href={`/add_program/${event.id}`}><h2>Pridať program</h2></Button></div>}
        </div>
    </>)
}
