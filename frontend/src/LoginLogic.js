import "./Home.css"
import Button from '@mui/material/Button'
 
export default function LoginLogic () {
    const HandleLogIn = () =>{
        if (localStorage.getItem["token"] !== null) {
            delete localStorage["token"];
            delete localStorage["org"];
        }
    }
    let txt = "Odhlásiť sa";
    let adr = "/"
    let welcome = ""
    if (localStorage["token"] != null) {
        welcome = "Ste prihlásený ako " + localStorage["username"];
    }
    if (localStorage["token"] == null) {
        txt = "Prihlásiť sa";
        adr = "/login";
    }
    return (<>
        <div>
            <div className="btn">
                <Button href={adr} onClick={HandleLogIn}>{txt}</Button>
                {(localStorage["token"] == null) ? (<Button href='/registration'> Zaregistrovať sa</Button>) : (<div></div>)}
            </div>
            <div className='log'>
                <p>{welcome}</p>
            </div>
        </div>
    </>)
}
