import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
 
export default function LoginLogic () {
    const [events, setEvents] = useState([])

    const HandleLogIn = () =>{
        if (localStorage.getItem["token"] !== null) {
            delete localStorage["token"];
            delete localStorage["org"];
        }
    }
    
    let loggedin = false;
    if (localStorage["token"] != null) {
        loggedin = true;
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
    return (<>
        <div>
            <div className="btn">
                <Button href={adr} onClick={HandleLogIn}>{txt}</Button>
                {(localStorage["token"] == null) ? (<Button href='/registration'> Zaregistrovať sa</Button>) : (<div></div>)}
            </div>
            <div className='log'>
                <p>{welcome}</p>
            </div>
        </div>
    </>)
}
