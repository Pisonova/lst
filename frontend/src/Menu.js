
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useState } from 'react'
import "./Register.css"

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function Menu () {
    const [expand, setExpand] = useState(false)

    return (      
        <>
        <List className="menu"
            sx={{ width: '20%', maxWidth: 300, bgcolor:  "white" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListItemButton onClick={() => (setExpand(!expand))}>
                <ListSubheader component="div" id="nested-list-subheader">
                    Menu
                </ListSubheader>
              </ListItemButton>
            }
            >
            {expand && <ListItemButton href='/'> 
            <ListItemText primary="Hlavná stránka" /> 
            </ListItemButton>}
            { expand && 
              (localStorage["token"] != null) &&
              <ListItemButton href="/my_events"> 
              <ListItemText primary="Moje akcie" /> 
              </ListItemButton>
            } 
            { expand &&
            <ListItemButton href='/archive'> 
              <ListItemText primary="Staršie akcie" /> 
            </ListItemButton>
            }
            { expand &&
            (localStorage["token"] != null) && 
            <ListItemButton href="/my_programs"> 
              <ListItemText primary="Moje programy" />
            </ListItemButton>
            }
            { expand && 
            (localStorage["org"] != null && localStorage["org"] == "true") &&
              <ListItemButton href="/actions/registered"> 
              <ListItemText primary="Prihlásení používatelia" /> 
              </ListItemButton>
            }
            { expand && 
            (localStorage["org"] != null && localStorage["org"] == "true") &&
              <ListItemButton href="/actions/feedbacks"> 
              <ListItemText primary="Feedbacky" /> 
              </ListItemButton>
            }
            { expand && 
            (localStorage["org"] != null && localStorage["org"] == "true") &&
              <ListItemButton href="/add_program/-1"> 
              <ListItemText primary="Vytvoriť nový program" /> 
              </ListItemButton>
            }
          </List>
        </>
    )
}
