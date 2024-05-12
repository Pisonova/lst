import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
import { useParams } from 'react-router-dom'
import { Check, X } from "@phosphor-icons/react"
 
export default function RegisteredUsers() {
    const [users, setUsers] = useState([])
    const [action, setAction] = useState()
    const type = useParams()["type"]
    const id = useParams()["id"]
    
    const getUsers =async ()=> {
        try {
            const {data} = await axios.get(`/api/registered/${type}/${id}`,  {params: {token: localStorage["token"], }});
            setUsers(data)
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
        getUsers()
    }, []);

    const getAction =async ()=> {
        if (type == "event") {
            try {
                const {data} = await axios.get(`/api/registration/${id}`);
                setAction(data[0]);
            } catch (error) { alert(error); }
        } else {
            try {
                const {data} = await axios.get(`/api/${type}/${id}`);
                setAction(data[0]);
            } catch (error) { alert(error); }
        }
    }

    useEffect(() => {
        getAction()
      }, []);
    
    const acc_dates = []
    
    if (type == "event" && action != null && action.accomodation_dates != null) {
      acc_dates.push(action.accomodation_dates.map((item) => 
      <th><div><p>Ubytovanie od {item.start.substring(0,10)} </p> <p> do {item.end.substring(0,10)}</p></div></th>
    ))}

    const myList = []
    if (users.length > 0) {
    myList.push(users.map((item) => <tr><td> {item.first_name} </td>
        <td> {item.last_name} </td>
        <td> {item.email} </td>
        {item.lunches != null && <td>{item.lunches}</td>}
        {item.accomodations != null && item.accomodations.map((acc) => <td> {(acc && <Check size={32} color="#2fc700"/>) || <X size={32} color="#e01b24"/>}</td>)}
        <td> {(item.org && <Check size={32} color="#2fc700"/>) || <X size={32} color="#e01b24"/>} </td>
    </tr>))
    }

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            <div className="list">
                <h2>Používatelia prihlásení na {type=="event" && "akciu" || "program"}: {action != null && action.name}</h2>
                <table className="users">
                    <thead>
                        <tr>
                        <th scope="col"> <div>Meno</div> </th>
                        <th scope="col"> <div>Priezvisko</div> </th>
                        <th scope="col"> <div>Email</div> </th>
                        {type == "event" && <th scope="col"> <div> Obedy </div> </th>}
                        {acc_dates}
                        <th scope="col"> <div>Organizátor</div> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {myList}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}
