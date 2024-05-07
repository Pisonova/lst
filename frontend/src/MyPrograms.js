import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
 
export default function MyPrograms () {
    const [programs, setPrograms] = useState([])
    
    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/myprograms`,  {params: {token: localStorage["token"], }});
            setPrograms(data)
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

    const myList = programs.map((item) => <div className="event">
        <h2>{item.name}</h2>
        <div>{item.type}</div>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
            <Button href={`/feedback/program/${item.id}`} > Feedback </Button>
        </div>)

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            {myList}
        </div>
    </>)
}
