import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import Button from '@mui/material/Button'
import { hostname } from './config.js';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
import { useParams } from 'react-router-dom'
import { Check, X } from "@phosphor-icons/react"
 
export default function ActionsLinks() {
    const [actions, setActions] = useState([])
    const type = useParams()["type"]
    
    const getActions =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/getactions`,  {params: {token: localStorage["token"], }});
            setActions(data)
        } catch (error) {
            if (error?.response?.data.message) {
                alert(error.response.data.message)
            }
            else {
                alert("Nepodarilo sa načítať dáta")
            }
        }
    }

    useEffect(() => {
        getActions()
    }, []);

    const events = []
    if (actions.events != null && actions.events.length > 0) {
        events.push(actions.events.map((item) => 
            <li><a href={`/${type}/${item.type}/${item.id}`}>{item.name}</a></li>
    ))}

    const programs = []
    if (actions.programs != null && actions.programs.length > 0) {
        programs.push(actions.programs.map((item) => 
            <li><a href={`/${type}/${item.type}/${item.id}`}>{item.name}</a></li>
    ))}

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            <div><h2>{type == "feedbacks" && "Feedbacky" || type == "registered" && "Prihlásení používatelia"}</h2></div>
            <div><h4>Akcie</h4>
            <ul>{events}</ul>
            </div>
            <div><h4>Programy</h4>
            <ul>{programs}</ul>
            </div>
            
        </div>
    </>
    )
}
