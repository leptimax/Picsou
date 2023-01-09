import React from "react"
import { FC } from "react"

import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import HistoryIcon from '@mui/icons-material/History';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';



export const LIST_ICON = [

    [<HomeIcon /> , "Accueil","/"],
    [<AddIcon/>, "Ajout","/add"],
    [<HistoryIcon />, "Historique","/history"],
    [<EqualizerIcon/>, "Statistiques","/statistics"],
    [<AccountTreeIcon/>, "test","/test"],

]