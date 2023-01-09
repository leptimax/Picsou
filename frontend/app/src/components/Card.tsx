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


const MONTH = {
    "JANVIER":1,
    "FEVRIER":2,
    "MARS":3,
    "AVRIL":4,
    "MAI":5,
    "JUIN":6,
    "JUILLET":7,
    "AOUT":8,
    "SEPTEMBRE":9,
    "OCTOBRE":10,
    "NOVEMBRE":11,
    "DECEMBRE":12

}


export const Card: FC<{element:any}> = ({element}) => {

    // const element={
    //     "id":"11111111111111111111111",
    //     "type de mouvement":"GAINS",
    //     "detail":"aucun detail disponible", //23
    //     "montant":1000,
    //     "provenance":"Leroy Merlin",//11
    //     "catégorie":"Extra",
    //     "date":{
    //         "année":2023,
    //         "jour":7,
    //         "mois":"JANVIER"
    //     }
    // }
    const handleClick = (id) => {
        console.log(id)
    }

    let detail = "aucun detail disponible"

  return(
    <Button variant="outlined" 
                onClick={() => {handleClick(element["id"])}}
                sx={{position:"absolute",
                      width:"80%",
                      height:"90%",
                      top:"5%",
                      left:"10%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} 
                      >
        <Grid container width={"100%"}>
            <Grid item sx={{position:"relative",left:"3%"}}>
                <Typography>{element["type de mouvement"]}</Typography>
            </Grid>

            {element["type de mouvement"] === "GAINS" ? (
                <>
                    <Grid item sx={{position:"relative",left:"15%"}}>
                        <Typography>{element["date"]["jour"]} / {MONTH[element["date"]["mois"]]} / {element["date"]["année"]}</Typography>
                    </Grid>
                    <Grid item sx={{position:"relative",left:"25%"}}>
                        <Typography>{element["categorie"]}</Typography>
                    </Grid>
                    <Grid item sx={{position:"absolute",left:"48%"}}>
                        <Typography>{element["provenance"].substring(0,12)}</Typography>
                    </Grid>
                </>
                ) : (
                <>
                    <Grid item sx={{position:"relative",left:"13%"}}>
                        <Typography>{element["date"]["jour"]} / {MONTH[element["date"]["mois"]]} / {element["date"]["année"]}</Typography>
                    </Grid>

                    <Grid item sx={{position:"relative",left:"23%"}}>
                        <Typography>{element["categorie"]}</Typography>
                    </Grid>

                    <Grid item sx={{position:"absolute",left:"48%"}}>
                        <Typography>{element["destination"].substring(0,12)}</Typography>
                    </Grid>
                </>
                )}
            
            {element["detail"] !== "" ? (
                <Grid item sx={{position:"absolute",left:"68%"}}>
                    <Typography>{element["detail"].substring(0,23)}</Typography>
                </Grid>
            ) : (
                <Grid item sx={{position:"absolute",left:"68%"}}>
                    <Typography>aucun détail disponible</Typography>
                </Grid>
            )}
            
            <Grid item sx={{position:"absolute",right:"5%"}}>
                <Typography>{parseInt(element["montant"]).toFixed(2)}€</Typography>
            </Grid>
        </Grid>
    </Button>
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