
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useState } from 'react'
import "./Register.css"

import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export default function Menu () {
    return (      
        <>
        <List className="menu"
            sx={{ width: '40%', maxWidth: 300, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Menu
                </ListSubheader>
            }
            >
            <ListItemButton href='/'>
            <ListItemText primary="Hlavná stránka" />
            </ListItemButton>
            {
              (localStorage["token"] != null) &&
              <ListItemButton href="/my_events">
              <ListItemText primary="Moje akcie" />
              </ListItemButton>
            }
            <ListItemButton href='/archive'>
              <ListItemText primary="Staršie akcie" />
            </ListItemButton>
            { (localStorage["token"] != null) && 
            <ListItemButton href="/my_programs">
              <ListItemText primary="Moje programy" />
            </ListItemButton>
            }
            { (localStorage["org"] != null && localStorage["org"] == "true") &&
              <ListItemButton href="/actions_users">
              <ListItemText primary="Prihlásený používatelia" />
              </ListItemButton>
            }
            { (localStorage["org"] != null && localStorage["org"] == "true") &&
              <ListItemButton href="/actions_feedbacks">
              <ListItemText primary="Feedbacky" />
              </ListItemButton>
            }
          </List>
        </>
    )
}
