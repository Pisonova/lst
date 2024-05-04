import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
 
export default function MyEvents () {
    const [events, setEvents] = useState([])

    const HandleLogIn = () =>{
        if (localStorage.getItem["token"] !== null) {
            delete localStorage["token"];
        }
    }
    
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
    
    let loggedin = false;
    if (localStorage["token"] != null) {
        loggedin = true;
    }
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
