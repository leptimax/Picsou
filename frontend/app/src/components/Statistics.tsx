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
import { LossChart } from "./LossChart";
import { EarnChart } from "./EarnChart";
import { DetailLossChart } from "./DetailLossChart";
import { DetailEarnChart } from "./DetailEarnChart";




export const Statistics: FC<{}> = ({}) => {

    
  return(
    <>
        <LossChart top={"2.5vh"} left={"10vw"}/>
        <DetailLossChart top={"52.5vh"} left={"10vw"} />
        <EarnChart top={"2.5vh"} right={"7.5vw"}/>
        <DetailEarnChart top={"52.5vh"} right={"7.5vw"}/>
    </>
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