import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { Grid, Typography } from "@mui/material";
import { relative } from "path";



export const Test: FC<{value}> = ({value}) => {

    
    const [positionLeft,setPositionLeft] = useState("0%")
    console.log(value)
    useEffect(() => {

        if(value < 10){
          setPositionLeft("44.2%")
        }
        else if((value >= 10) && (value <100)){
          setPositionLeft("43.5%")
        }
        else if((value >= 100) && (value < 1000)){
          setPositionLeft("41.5%")
        }
        else if((value >= 1000) && (value < 10000)){
          setPositionLeft("39.5%")
        }
        else if((value >= 10000) && (value < 100000)){
          setPositionLeft("37.5%")
        }
  
      },[value])

    return(
         <Typography sx={{position:"absolute",
                                left:positionLeft,
                                top:"45%",
                                textAlign:"center",
                                fontSize:35,
                                fontWeight:"bold",
                                
            }}>{value.toFixed(2)}€</Typography>
    )

}