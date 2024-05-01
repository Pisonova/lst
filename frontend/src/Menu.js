
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import { useState } from 'react'
import "./Register.css"
import {TextField, CardMedia, Button} from '@mui/material';
import axios from 'axios'
import {hostname} from './config';

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
            >{
              (localStorage["token"] != null) &&
              <ListItemButton href="/my_events">
              <ListItemText primary="Moje akcie" />
              </ListItemButton>
            }
            <ListItemButton href='/archiv'>
              <ListItemText primary="Staršie akcie" />
            </ListItemButton>
            { (localStorage["token"] != null) && 
            <ListItemButton href="my_programs">
              <ListItemText primary="Moje programy" />
            </ListItemButton>
            }
          </List>
        </>
    )
}
