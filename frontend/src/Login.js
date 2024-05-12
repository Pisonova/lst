
import { useState } from 'react'
import "./Register.css"
import {TextField, Button} from '@mui/material';
import axios from 'axios'
import {hostname} from './config';
import Menu from './Menu'

export default function Login () {
    const [name, setName] = useState('')
    const [passwd, setPasswd] = useState('')

    const handleSubmit = () => {
        axios.post(`/api/login`, {
            username: name,
            password: passwd
        }).then(function ({data}) {
            localStorage.setItem("username", name)
            localStorage.setItem("token", data.token)
            localStorage.setItem("org", data.org)
            console.log(data.org)
            window.location.replace(window.location.origin) 
        }).catch(function (error) {
            if (error.response?.data?.message !== null) {
                alert(error.response.data.message)
            } else {alert(error)};
        });
    }

    if (localStorage.getItem("token") !== null) {
        window.location.replace(window.location.origin)            
    }
    return (      
        <>
        <Menu />
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
                <Button variant="contained" sx={{width: 244, color: 'white' }} onClick={handleSubmit}>Submit</Button>
                <div className='change'>
                <a href="/registration">Nemáte ešte vytvorený účet? Registrujte sa</a>
                </div>
            </form>
        </div>
        </>
    )
}
