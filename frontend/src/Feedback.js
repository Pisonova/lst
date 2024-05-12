import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox';
import { FormLabel, RadioGroup, FormGroup, FormControlLabel } from '@mui/material'
import { hostname } from './config';
import { useParams } from 'react-router-dom'
import Menu from './Menu'
import LoginLogic from './LoginLogic';


export default function Feedback(props) {
    const [points, setPoints] = useState(0)
    const type = useParams()["type"]
    const id = useParams()["id"]
    const [feedback, setFeedback] = useState("")
    const [action, setAction] = useState("")
    const [anonymous, setAnonymous] = useState(false)
    
    console.log(type, id)

    const handleSubmit = () => {
        let token = ""
        if (!anonymous) { token = localStorage["token"] }
        axios.post(`http://${hostname}:8000/api/add_feedback`, {
            token: token,
            type: type,
            id: id,
            points: points,
            feedback: feedback,
        }).then(function ({data}) {
            window.location.replace(window.location.origin) 
        }).catch(function (error) {
            if (error.response?.data?.message !== null) {
                alert(error.response.data.message)
            } else {alert(error)};
        });
    }

    const handleAnonym = () => {
        setAnonymous(!anonymous);
    }

    const getEvent =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/${type}/${id}`);
            setAction(data[0]);
        } catch (error) {
            if (error?.response?.data?.message){
                alert(error.response.data.message)
            } else {alert(error);}
        }
    }

    useEffect(() => {
        getEvent()
      }, []);
       
    return (<>
        <div> <Menu /> <LoginLogic />
        <div className="container">
            <form>
            <FormGroup>
                <h2>Feedback na akciu:</h2>
                <h2>{action.name}</h2>
                <div className="ui divider"></div>
                <div className="field">
                    <TextField
                        id="outlined-number"
                        label="Počet bodov (0 = najhoršie, 10 = najlepšie)"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: {min : 0, max: 10}}}
                        defaultValue={0}
                        onChange={(e) => setPoints(e.target.value)}
                    />  
                </div>
                <div>
                <FormGroup>
                    <FormLabel > Chcete nám k tomu povedať viac? </FormLabel>
                    <TextField onChange={(e) => setFeedback(e.target.value)}/>
                </FormGroup>
                </div>
                <div>
                <FormGroup>
                    <FormLabel > Chcete aby bol feedback anonymný? </FormLabel>
                    <Checkbox onChange={handleAnonym}> Áno </Checkbox>
                </FormGroup>
                </div>
                <div>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </FormGroup>
            </form>
        </div>
        </div>
    </>)
}
