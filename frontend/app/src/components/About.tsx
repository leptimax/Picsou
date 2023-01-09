import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { Button, Grid, List, Typography } from "@mui/material";
import { relative } from "path";
import { SearchBar } from "./SearchBar";
import { useHistory } from "react-router-dom";




export const About: FC<{}> = ({}) => {


  return(

    <Stack sx={{width:"125%",position:"relative",left:"-10%"}}>

        <Typography sx={{textAlign:"center",position:"relative",top:"5vh"}} variant="h2">A Propos</Typography>
        <Typography sx={{position:"relative",top:"10vh", fontSize:28}}>
            Le logiciel <b>PICSOU</b> a été développé par l'équipe <i>Dabbing Meerkat Studio</i>. Si vous rencontrez le moindre problème lors de l'utilisation de 
            ce logiciel, veuillez contacter notre service de maintenance à l'adresse suivante : 
        </Typography>
        <Typography sx={{textAlign:"center",position:"relative",top:"13vh", fontSize:28}}>dabbingMeerkatStudio@gmail.com</Typography>
        <img src="Picsou.png" style={{width:"30%",position:"relative",top:"18vh" }}/>
        <img src="DabbingMeerkat.png" style={{width:"23%",position:"absolute",top:"64%",left:"75%" }}/>
        <Typography sx={{fontSize:28,textAlign:"center",position:"relative",top:"25vh"}}><span>&copy;</span>Dabbing Meerkat Studio Tous Droits Réservés</Typography>

    </Stack>

  )

}




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