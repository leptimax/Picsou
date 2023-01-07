import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { AppBar, Box, Button, Grid, IconButton, InputBase, List, TextField, Toolbar, Typography } from "@mui/material";
import { relative } from "path";
import SearchIcon from '@mui/icons-material/Search';

import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';

export const Test: FC<{}> = () => {

    // const [value,setValue] = useState("")
    // // console.log(value)
    // const date = new Date()
    // const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    // const DAY = date.getDate()
    // const YEAR = date.getFullYear()
    // console.log(MONTH,DAY,YEAR)

    // const getElement = async () => {
    //   const query_info = query(collection(firestore,"test"),where("date.année","==",YEAR),where("date.mois","==",MONTH))
      

    //   let extra_temp = 0
    //   let pay_temp = 0
    //   let gouv_temp = 0
    //   let valueGlobalTemp = 0
    //   let element;

    //   const snapshot = await getDocs(query_info)
    //   snapshot.forEach((doc) => {
    //     console.log(doc.data())
    //   })
    // }
    // getElement()

    return(
      <>
       {/* <Box sx={{backgroundColor:"rgb(36,36,36)", position:"absolute", top:"20%", width:"15%",height:"15%", borderRadius:"20px"}}> */}
        <Button variant="outlined" 
                sx={{position:"absolute",
                      width:"15%",
                      height:"15%",
                      top:"20%",
                      left:"10%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} >
          <AddIcon fontSize="large" sx={{color:"white", marginLeft:"5%"}} />
          <Typography sx={{color:"white", fontSize:"20px"}}>Nouvelle transaction</Typography>
        </Button>

        <Button variant="outlined" 
                sx={{position:"absolute",
                      width:"15%",
                      height:"15%",
                      top:"20%",
                      left:"44%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} >
          <HistoryIcon fontSize="large" sx={{color:"white", }} />
          <Typography sx={{color:"white", fontSize:"20px", paddingLeft:"20%", marginRight:"10%"}}>Historique</Typography>
        </Button>

        <Button variant="outlined" 
                sx={{position:"absolute",
                      width:"15%",
                      height:"15%",
                      top:"20%",
                      left:"77.5%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} >
          <BarChartIcon fontSize="large" sx={{color:"white"}} />
          <Typography sx={{color:"white", fontSize:"20px", paddingLeft:"10%", marginRight:"10%"}}>Statistiques</Typography>
        </Button>
      {/* </Box> */}
      </>
    )

}