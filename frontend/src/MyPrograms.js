import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
 
export default function MyPrograms () {
    const [programs, setPrograms] = useState([])
    let org = localStorage["org"] != null && localStorage["org"]=="true"
    
    const getData =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/myprograms`,  {params: {token: localStorage["token"], }});
            setPrograms(data)
        } catch (error) {
            if (error?.response?.data.message) { alert(error.response.data.message) }
            else { alert(error) }
        }
    }

    useEffect(() => {
        getData()
      }, []);
  
    
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

    let linkstart = '/feedback/'
    let fb = "Feedback"
    if (org) { 
        linkstart='/feedbacks/'
        fb = "Feedbacky od účastníkov" 
    }

    const myList = programs.map((item) => <div className="event">
        <h2>{item.name}</h2>
        <div>{item.type}</div>
        {item.more_info !== null &&
            <p>{item.more_info}</p>
        }
            <p>Začiatok: {item.start.substring(0,10)} </p>
            <p>Koniec: {item.end.substring(0, 10)}</p>
            <Button href={linkstart + `program/${item.id}`} > {fb} </Button>
            {org && item.registered && <Button href={`registered/program/${item.id}`}> Prihlásení používatelia </Button>}
            {(org && item.registered && <Button href={`/update_program/${item.id}`}>Upraviť program</Button>) ||
            (item.registered && <div className='logOut'><Button color='inherit' onClick={() => HandleLogOut(item)}> Zrušiť registráciu </Button></div>)}   
        </div>)

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            {myList}
        </div>
    </>)
}
