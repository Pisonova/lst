
import { Link } from 'react-router-dom'
import { useState } from 'react'
import "./Register.css"
import {TextField, CardMedia, Button} from '@mui/material';
import logo from './images/bluelogo.svg'

export default function Login () {

    return (
        <>
        <div className="container">
            <form>
                <h2>Prihlásenie</h2>
                <div className="ui divider"></div>
                <div className="field">
                    <TextField
                        label='Používateľské meno'
                    />
                </div>
                <div className="field">
                    <TextField
                        label='Heslo'
                        type='password'
                    />
                </div>
                <Button variant="contained">Submit</Button>
            </form>
        </div>
        </>
    )
}
