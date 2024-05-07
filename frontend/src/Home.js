import axios from 'axios'
import { useEffect, useState } from 'react'
import { hostname } from './config';
import Button from '@mui/material/Button'
import "./Home.css"
import Menu from "./Menu.js"
import LoginLogic from "./LoginLogic.js"
 
export default function Home () {
    const [events, setEvents] = useState([])

    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/`,  {params: {token: localStorage["token"], }});
            setEvents(data)
        } catch (error) {
            console.log(error);
        }
    }

    const HandleLogOut = (event) =>{
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

    useEffect(() => {
        getData()
      }, []);
    
    let loggedin = false;
    if (localStorage["token"] != null) { loggedin = true; }

    const myList = events.map((item) => <div className="event">
        <Button href={`/event_info/${item.id}`} > <h2>{item.name}</h2> </Button>
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
            {item.registered && <div className='logOut'><Button color='inherit' onClick={() => HandleLogOut(item)}> Zrušiť registráciu </Button></div>}
        </div>)

    if (myList.length === 0) {
        myList.push(<div className="event"> <h2>V najbližšej dobe sa žiadne akcie nekonajú </h2></div>)
    }

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            {myList}
        </div>
    </>)
}
