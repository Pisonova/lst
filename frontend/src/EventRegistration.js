import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Home.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import { FormLabel, RadioGroup, FormGroup, FormControlLabel } from '@mui/material'
import { hostname } from './config';
import { useParams } from 'react-router-dom'
import Menu from './Menu.js';
import LoginLogic from './LoginLogic';

export default function EventRegistration (props) {
    const [lunches, setLunches] = useState(0)
    const [logEvent, setEvent] = useState('')
    const { eventId } = useParams();
    const accomodations = []
    const accs = []
    
    const handleSubmit = () => {
        axios.post(`http://${hostname}:8000/api/register_event`, {
            token: localStorage["token"],
            event_id: eventId,
            lunches: lunches,
            accomodations: accomodations[0],
        }).then(function ({data}) {
            window.location.replace(window.location.origin) 
        }).catch(function (error) {
            if (error.response?.data?.message !== null) {
                alert(error.response.data.message)
            } else {alert(error)};
        });
    }

    const handleClick = (start, end) => {
        for (let i = 0; i < accs[0].length; i++) {
            if (start == accs[0][i][0] && end == accs[0][i][1]) {
                accomodations[0][i] = !accomodations[0][i];
            }
        }
    }

    const getEvent =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/registration/${eventId}`);
            setEvent(data[0]);
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        getEvent()
      }, []);

      const myList = []
      if (logEvent.accomodation_dates != null) {
        accs.push(logEvent.accomodation_dates.map((item) => [item.start.substring(0, 10), item.end.substring(0,10)]))
        accomodations.push(logEvent.accomodation_dates.map(() => false))
        myList.push(logEvent.accomodation_dates.map((item) => <div className="accomodations">
          <FormControlLabel control={<Checkbox onClick={(e) => handleClick(item.start, item.end)} />} label={item.start.substring(0,10) + " - " + item.end.substring(0, 10)} />
        </div>))
      }
       
    return (<>
        <div>
            <Menu />
            <LoginLogic />
        <div className="container">
            <form>
            <FormGroup>
                <h2>Registrácia na akciu: </h2><h2>{logEvent.name}</h2>
                <div className="ui divider"></div>
                <div className="field">
                    <TextField
                        id="outlined-number"
                        label="Počet obedov"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{ inputProps: {min : 0, max: 14}}}
                        defaultValue={0}
                        onChange={(e) => setLunches(e.target.value)}
                    />  
                </div>
                <FormGroup>
                    <FormLabel > Požadujete ubytovanie? </FormLabel>
                    {myList}
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </FormGroup>
            </form>
        </div>
        </div>
    </>)
}
