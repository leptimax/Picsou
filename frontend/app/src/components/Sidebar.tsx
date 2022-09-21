import { CSSObject, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Theme, useTheme } from "@mui/material"
import React from "react"
import { FC } from "react"

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { LIST_ICON } from "../utils/SideBarItem";
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




export const SideBar: FC<{}> = ({}) => {

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
                        <ListItem key={"display"} disablePadding sx={{ display: 'block' }}>
                        
                            { open ? (
                            <ListItemButton sx={{
                                                    minHeight: 48,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,
                                                }}
                                onClick={handleDrawerClose}>
                                    
                                <ListItemIcon sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}>
                                    <ChevronLeftIcon/>
                                </ListItemIcon>
                            </ListItemButton>

                            ) : (
                            
                            <ListItemButton sx={{
                                                    minHeight: 48,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,
                                                }}
                                onClick={handleDrawerOpen}>

                                <ListItemIcon sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}>
                                    <ChevronRightIcon/>
                                </ListItemIcon> 
                            </ListItemButton>
                            
                            )}
                            
                            </ListItem>
                            {
                            LIST_ICON.map((element) => ( 

                                <ListItem key={element[1]} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton sx={{
                                                            minHeight: 48,
                                                            justifyContent: open ? 'initial' : 'center',
                                                            px: 2.5,
                                                        }}>
                                        <ListItemIcon sx={{
                                                            minWidth: 0,
                                                            mr: open ? 3 : 'auto',
                                                            justifyContent: 'center',
                                                        }}>
                                                 {element[0]}
                                        </ListItemIcon>
                                    <ListItemText primary={element[1]} sx={{ opacity: open ? 1 : 0, color:"white" }} />
                                </ListItemButton>
                            </ListItem>
                            
                            ))}
                        </Stack>
                    </List>
                </Stack>
            </DrawerPerso>
        </>
    )
    
}