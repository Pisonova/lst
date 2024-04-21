
import { useState } from 'react'
import "./Register.css"
import {TextField, CardMedia, Button} from '@mui/material';
import axios from 'axios'
import {hostname} from './config';

export default function Login () {
    const [name, setName] = useState('')
    const [passwd, setPasswd] = useState('')

    const handleSubmit = () => {
        axios.post(`http://${hostname}:8000/api/login`, {
            username: name,
            password: passwd
        }).then(function ({data}) {
            localStorage.setItem("username", name)
            localStorage.setItem("token", data.token)
            window.location.replace(window.location.origin) 
        }).catch(function (error) {
            alert(error);
        });
    }

    if (localStorage.getItem("token") !== null) {
        window.location.replace(window.location.origin)            
    }
    return (      
        <>
        <div className="container">
            <form>
                <h2>Prihlásenie</h2>
                <div className="ui divider"></div>
                <div className="field">
                    <TextField
                        label='Používateľské meno'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="field">
                    <TextField
                        label='Heslo'
                        type='password'
                        onChange={(e) => setPasswd(e.target.value)}
                    />
                </div>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
        </>
    )
}
