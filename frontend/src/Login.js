
import { Link } from 'react-router-dom'
import { useState } from 'react'


export default function Login () {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        
    }

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <p>
                <label>Username or email address</label><br/>
                <input type="text" onChange={(e) => {
                    setName(e.target.value)}
                 } />
            </p>
            <p>
                <label>Password</label>
                <br/>
                <input type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </p>
            <p>
                <button onClick={handleSubmit} disabled={!(name.length > 0 && password.length > 5)}>Login</button>
            </p>
        </div>
    )
}
