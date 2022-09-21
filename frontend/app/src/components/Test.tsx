import { Button, CSSObject, Drawer, Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Theme, Typography, useTheme } from "@mui/material"
import React from "react"
import { FC } from "react"

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
// import { ListIcon } from "./ListIconsSidebar";
import { FunctionsOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom";

const drawerWidth = 200;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

const DrawerPerso = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );


const LIST_ICON = [[<HomeIcon /> , "Accueil","/"],[<AddIcon/>, "Ajout","/"]]

export const Test: FC<{}> = ({}) => {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const history = useHistory()

    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

    return(
        <>
            <DrawerPerso anchor="left" variant="permanent" PaperProps={{sx: {backgroundColor:"black"}}} open={open}>
                <Stack sx={{backgroundColor:"black"}}>
                    <img src="Picsou.png" 
                            style={{width:"50px", 
                            marginLeft: open ? "75px":"5px",
                            marginTop:"10px", 
                            marginRight: open ? "75px" : "5px",
                            cursor:"pointer"
                        }}
                            onClick={() => history.push("/")}/>
                    <List sx={{textAlign:"center"}}>
                        <Stack>
                            { open ? 
                            (<IconButton color="primary" onClick={handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>) : (
                            <IconButton color="primary" onClick={handleDrawerOpen}>
                                <ChevronRightIcon/>
                            </IconButton> )  
                            
                            }
                            {
                            LIST_ICON.map((element) => ( 
                            
                                // <div>
                                // <IconButton color="primary" sx={{minHeight:48}} onClick={() => console.log(element[2])}>
                                //     {element[0]}
                                // </IconButton>
                                // {element[1]}
                                // </div>

                                <ListItem key={element[1]} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                        >
                                            <IconButton color="primary" sx={{minHeight:48}} onClick={() => console.log(element[2])}>
                                                 {element[0]}
                                             </IconButton>
                                        </ListItemIcon>
                                    <ListItemText primary={element[1]} sx={{ opacity: open ? 1 : 0, color:"white" }} />
                                </ListItemButton>
                            </ListItem>

                            // <ListItem key={element[1]} disablePadding sx={{display:'block'}}>
                            //     <ListItemButton sx={{
                            //         minHeight: 48,
                            //         justifyContent: open ? 'initial' : 'center',
                            //         px: 2.5,
                            //         }}>
                            //         <ListItemIcon
                            //         sx={{
                            //             minWidth: 0,
                            //             mr: open ? 3 : 'auto',
                            //             justifyContent: 'center',
                            //         }}
                            //         >
                            //             {element[0]}
                            //         </ListItemIcon>
                            //         <ListItemText primary={element[1]}
                            //     </ListItemButton>
                            // </ListItem>
                            
                            ))}
                            {/* <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                    >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem> */}
                            {/* <IconButton color="primary" onClick={() => console.log("coucou")}>
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
                            </IconButton> */}
                        </Stack>
                    </List>
                </Stack>
            </DrawerPerso>
        </>
    )
    
}