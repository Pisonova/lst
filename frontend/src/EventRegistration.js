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


export default function EventRegistration (props) {
    const [lunches, setLunches] = useState(0)
    const [accomodation, setAccomodation] = useState(false)
    const [logEvent, setEvent] = useState('')
    const { eventId } = useParams();
    
    const handleSubmit = () => {
        console.log("")
        axios.post(`http://${hostname}:8000/api/register_event`, {
            token: localStorage["token"],
            event_id: eventId,
            lunches: lunches,
            accomodation: accomodation,
        }).then(function ({data}) {
            window.location.replace(window.location.origin) 
        }).catch(function (error) {
            if (error.response?.data?.message !== null) {
                alert(error.response.data.message)
            } else {alert(error)};
        });
    }

    const getEvent =async ()=> {
        try {
            const {data} = await axios.get(`http://${hostname}:8000/api/registration/${eventId}`);
            setEvent(data[0]);
            console.log(logEvent)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvent()
      }, []);

      const myList = []
      if (logEvent.accomodation_dates != null) {
        myList.push(logEvent.accomodation_dates.map((item) => <div className="accomodations">
          <FormControlLabel control={<Checkbox />} label={item.start.substring(0,10) + " - " + item.end.substring(0, 10)} />
        </div>))
      }
       
    return (<>
        <div className="container">
            <FormGroup>
                <h2>Registrácia na akciu:</h2>
                <h2>{logEvent.name}</h2>
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
                <div className="field">
                    <FormLabel id='ubytovanie'>Požadujete ubytovanie?</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={true}
                        name="accomodation"
                    >
                        <FormControlLabel value={true} control={<Radio />} label='Áno' onChange={(e) => setAccomodation(e.target.value)}/>
                        <FormControlLabel value={false} control={<Radio />} label='Nie' onChange={(e) => setAccomodation(e.target.value)}/>
                    </RadioGroup>
                </div>
                <FormGroup>
                    <FormLabel > Ktoré obdobia? </FormLabel>
                    {myList}
                </FormGroup>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </FormGroup>
        </div>
    </>)
}
