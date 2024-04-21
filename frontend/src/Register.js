import { Link } from 'react-router-dom'
import { useState } from 'react'
import "./Register.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default function Register () {

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
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Priezvisko'
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Používateľské meno'
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Email'
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Heslo'
                            type='password'
                        />
                    </div>
                    <div className="field">
                        <TextField
                            label='Potvrďte heslo'
                            type='password'
                        />
                    </div>
                    <Button variant="contained">Submit</Button>
                </div>
            </form>
        </div>
        </>
    )
}
