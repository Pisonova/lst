import axios from 'axios'
import { useEffect, useState } from 'react'
import "./Register.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { FormLabel, FormGroup, FormControlLabel, InputLabel } from '@mui/material'
import { hostname } from './config';
import Menu from './Menu'
import { useParams } from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown'
import LoginLogic from './LoginLogic';

export default function NewProgram () {
    const id = useParams()["id"]
    const [name, setName] = useState('')
    const [visible, setVisible] = useState(false)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [reg_start, setRegStart] = useState('')
    const [reg_end, setRegEnd] = useState('')
    const [more_info, setMoreInfo] = useState('')
    
    const [open, setOpen] = useState(false)
    const [program_types, setProgramTypes] =  useState([])
    const [selectedPT, setPT] = useState({"id": -1, "name": "Zvoľte typ programu"})
    
    const handleOpen = () => { setOpen(!open) }
    const handlePT = (e) => {
        setPT({"id": e.target.id, "name": e.target.value})
        setOpen(false)
    }
    const pts = []
    if (program_types.length > 0) {
    pts.push(program_types.map((item) => 
        <Button className='pt' sx={{ width: '90%', maxWidth: 400, color: 'white' }} variant="contained" value={item.name} id={item.id} onClick={(e) => handlePT(e)}>{item.name}</Button>
    ))}

    const [allEvents, setAllE] = useState([])   
    const [selectedE, setE] = useState([])      
    const [preSelectedE, setPSE] = useState([])

    const eOptions = []
    allEvents.forEach((item) => eOptions.push({id: item.id, name: item.name + " " + item.start.substring(0,4)}));
    const onSelectE = (selectedList, selectedItem) => { setE([...selectedE, selectedItem]); };
    const onRemoveE = (selectedList, removedItem) => {
        setE(selectedE.filter(item => item !== removedItem))
    };

    const [allOrganizers, setAllO] = useState([])   
    const [selectedOrgs, setOrgs] = useState([])      
    const [preSelectedOrg, setPSO] = useState([])

    const oOptions = []
    allOrganizers.forEach((item) => oOptions.push({id: item.id, name: item.first_name + " " + item.last_name}));
    const onSelectO = (selectedList, selectedItem) => { setOrgs([...selectedOrgs, selectedItem]); };
    const onRemoveO = (selectedList, removedItem) => {
        setOrgs(selectedOrgs.filter(item => item !== removedItem))
    };
    

    const handleClick = () => { setVisible(!visible); console.log(start)}

    const handleSubmit = (e) => {
        if (name.length == 0) {
            alert("Názov programu je povinný")
        } else {
            if (start.length === 0 && end.length === 0) {
                alert("Začiatok a koniec programu sú povinné")
            } else {
                axios.post(`/api/add_program`, {
                    token: localStorage["token"], name: name, visible: visible,
                    start: start, end: end, reg_start: reg_start, reg_end: reg_end,
                    more_info: more_info, program_typeId: selectedPT["id"],
                    organizers: selectedOrgs, events: selectedE,
                }).then(function ({data}) {
                    window.location.replace(window.location.origin)
                }).catch(function (error) {
                    if (error.response?.data?.message !== null) {alert(error.response.data.message)}
                    else {alert("Nepodarilo sa pridať program")};
                });
            }
        }
    }

    const getData =async ()=> {
        try {
            const {data} = await axios.get(`/api/getProgramTypes`)
            setProgramTypes(data); setPT(data[0])
            console.log(selectedPT)
        } catch (error) {
            if (error?.response?.data?.message) { alert(error.response.data.message) } 
            else { alert("Nepodarilo sa načítať typy programu"); }
        }
        try {
            const {data} = await axios.get(`/api/getOrganizers`, 
                {params: { token: localStorage["token"] }})
            setAllO(data);
            setPSO([{id: data[0].id, name: data[0].first_name + " " + data[0].last_name}]);
            setOrgs([{id: data[0].id, name: data[0].first_name + " " + data[0].last_name}])
        } catch (error) {
            if (error?.response?.data?.message) { alert(error.response.data.message) } 
            else { alert("Nepodarilo sa načítať organizátorov"); }
        }
        try {
            const {data} = await axios.get(`/api/getEvents`, 
                {params: { token: localStorage["token"], eventId: id }})
            setAllE(data); 
            if (id != -1) {setPSE([{id: data[0].id, name: data[0].name + " " + data[0].start.substring(0,4)}]);
            setE([{id: data[0].id, name: data[0].name + " " + data[0].start.substring(0,4)}])}
        } catch (error) {
            if (error?.response?.data?.message) { alert(error.response.data.message) } 
            else { alert("Nepodarilo sa načítať akcie"); }
        }
    }

    useEffect(() => {
        getData()
      }, []);

    return (
        <>
        <Menu />
        <LoginLogic />
        <div className="program">
            <form>
                <h2>Nový program</h2>
                <div className="ui divider"></div>
                <div className="ui form">
                    <div className="field">
                        <TextField
                            label='Názov'
                            onChange={(e) => setName(e.target.value)}       
                        />
                    </div>
                    <FormGroup>
                    <FormControlLabel control={<Checkbox onClick={(e) => {handleClick()}} default={visible}/>} label="Má byť tento program viditeľný?" />
                    </FormGroup>
                    <div className="field">
                        <InputLabel>Začiatok</InputLabel>
                        <input aria-label="Začiatok" name="Začiatok" type="datetime-local" onChange={(e) => setStart(e.target.value)}/>
                    </div>
                    <div className="field">
                        <InputLabel>Koniec</InputLabel>
                        <input aria-label="Koniec" type="datetime-local" onChange={(e) => setEnd(e.target.value)}/>
                    </div>
                    <div className="field">
                        <InputLabel>Registrácia od:</InputLabel>
                        <input aria-label="Registrácia od" type="datetime-local" onChange={(e) => setRegStart(e.target.value)}/>
                    </div>
                    <div className="field">
                        <InputLabel>Registrácia do:</InputLabel>
                        <input aria-label="Registrácia od" type="datetime-local" onChange={(e) => setRegEnd(e.target.value)}/>
                    </div>
                    <div className="field">
                        <TextField
                            label='Viac informácii'
                            onChange={(e) => setMoreInfo(e.target.value)}
                        />
                    </div>
                    <div className="programTypes">
                        <InputLabel>Typ programu: </InputLabel>
                        <Button sx={{ width: '90%', maxWidth: 400, color: 'white' }} variant="contained" onClick={handleOpen}>{selectedPT.name}</Button>
                        {open && <div className="dropdownPT">
                            {pts}
                        </div>}
                    </div> 
                    <div className="events">
                        <Multiselect disablePreSelectedValues={true} placeholder="Pridať akciu" showArrow={true} options={eOptions} selectedValues={preSelectedE} onSelect={onSelectE} onRemove={onRemoveE} showCheckbox={true} displayValue="name"/>
                    </div> 
                    <div className="orgs">
                        <Multiselect disablePreSelectedValues={true} placeholder="Pridať organizátorov" showArrow={true} options={oOptions} selectedValues={preSelectedOrg} onSelect={onSelectO} onRemove={onRemoveO} showCheckbox={true} displayValue="name"/>
                    </div> 

                    <Button variant="contained" onClick={(e) => handleSubmit(e)}>Pridať</Button>
                </div>
            </form>
        </div>
        </>
    )
}
