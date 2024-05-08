import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import Button from '@mui/material/Button'
import { hostname } from './config';
import Menu from "./Menu.js"
import LoginLogic from './LoginLogic.js';
import { useParams } from 'react-router-dom'
 
export default function ShowFeedbacks () {
    const [feedbacks, setFeedbacks] = useState([])
    const type = useParams()["type"]
    const id = useParams()["id"]
    
    const getFeedbacks =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/feedbacks/${type}/${id}`,  {params: {token: localStorage["token"], }});
            setFeedbacks(data)
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
        getFeedbacks()
      }, []);

    console.log(feedbacks)
    const myList = feedbacks.map((item) => <tr><td> {item.first_name != null && item.first_name} </td>
        <td> {item.last_name != null && item.last_name} </td>
        <td> {item.points} </td>
        <td> {item.comment != null && item.comment}</td>
    </tr>)

    return (<>
        <div>
            <Menu />
            <LoginLogic />
            <div class="list">
                <table class="feedbacks">
                    <thead>
                        <th scope="col"> <div>Meno</div> </th>
                        <th scope="col"> <div>Priezvisko</div> </th>
                        <th scope="col"> <div>Body</div> </th>
                        <th scope="col"> <div>Komentár</div> </th>
                    </thead>
                    <tbody>
                        {myList}
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}
