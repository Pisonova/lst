import axios from 'axios'
import { useState } from 'react'
import "./Register.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { hostname } from './config';


export default function Register () {
    const [first_name, setFName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUName] = useState('')
    const [email, setEmail] = useState('')
    const [passwd, setPasswd] = useState('')
    const [ctrl_passwd, setCtrlPasswd] = useState('')

    const handleSubmit = () => {
        if (passwd !== ctrl_passwd) {
            alert("Heslá sa nezhodujú")
        } else {
            if (first_name.length === 0 || surname.length === 0 || email.length === 0 || username.length === 0) {
                alert("Všetky polia sú povinné")
            } else {
                if (passwd.length < 6) {
                    alert("Heslo musí mať aspoň 6 znakov")
                } else {
                    axios.post(`http://${hostname}/api/register`, {
                        first_name: first_name,
                        surname: surname,
                        email: email,
                        username: username,
                        password: passwd
                    }).then(function ({data}) {
                        localStorage.setItem("username", username)
                        localStorage.setItem("token", data.token)
                        window.location.replace(window.location.origin) 
                    }).catch(function (error) {
                        if (error.response?.data?.message !== null) {alert(error.response.data.message)}
                        else {alert(error)};
                    });
                }
            }
 
        }
    }

    if (localStorage.getItem("token") !== null) {
        window.location.replace(window.location.origin)            
    }
    return (
        <>
        <div className="container">
            <form>
                <h2>Registrácia</h2>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <TextField
                            label='Meno'
                            onChange={(e) => setFName(e.target.value)}       
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Priezvisko'
                            onChange={(e) => setSurname(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Používateľské meno'
                            onChange={(e) => setUName(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Heslo'
                            type='password'
                            onChange={(e) => setPasswd(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Potvrďte heslo'
                            type='password'
                            onChange={(e) => setCtrlPasswd(e.target.value)}
                        />
                    </div>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
        </div>
        </>
    )
}
