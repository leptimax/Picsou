import { Button, Drawer, IconButton, List, Stack, Typography } from "@mui/material"
import React from "react"
import { FC } from "react"

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import { ListIcon } from "./ListIconsSidebar";
import { FunctionsOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";



export const Sidebar: FC<{}> = ({}) => {


    const history = useHistory()

    return(
        <>
            <Drawer anchor="left" variant="permanent" PaperProps={{sx: {backgroundColor:"black"}}}>
                <Stack sx={{backgroundColor:"black"}}>
                    <img src="Picsou.png" 
                            style={{width:"50px", 
                            marginLeft:"5px",
                            marginTop:"10px", 
                            marginRight:"5px",
                            cursor:"pointer"
                        }}
                            onClick={() => history.push("/")}/>
                    <List sx={{textAlign:"center"}}>
                        <Stack>
                            <IconButton color="primary" onClick={() => console.log("coucou")}>
                                <ChevronRightIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={() => console.log("coucou")}>
                                <HomeIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={() => console.log("coucou")}>
                                <AddIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={() => console.log("coucou")}>
                                <EqualizerIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={() => console.log("coucou")}>
                                <SearchIcon/>
                            </IconButton>
                            <IconButton color="primary" onClick={() => console.log("coucou")}>
                                <AccountTreeIcon/>
                            </IconButton>
                        </Stack>
                    </List>
                </Stack>
            </Drawer>
        </>
    )
    
}