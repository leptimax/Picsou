import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { relative } from "path";
import { SearchBar } from "./SearchBar";
import { Test2 } from "./Test2";





export const Test: FC<{}> = ({}) => {




  const [listTransaction,setListTransaction] = useState(undefined)


  useEffect(() => {
    getElement()
  },[])

  const getElement = async () => {
    const query_earn = query(collection(firestore,"test"),orderBy("date","desc"))
    

    let temp = []
    let element;

    const snapshot = await getDocs(query_earn)
    snapshot.forEach((doc) => {
      if(doc.data()){
        element = doc.data()
        
        temp.push(element)
        // console.log(temp)
          
        }
        
      })

    setListTransaction(temp)
    
    
    
}
  console.log(listTransaction)
  return(
    <>
      <SearchBar/>
      {(listTransaction === undefined) ? (<Typography sx={{position:"absolute",top:"40%",left:"40%",fontSize:32}}>aucune entrée disponible</Typography>) : (

        <List sx={{position:"absolute",top:"20%",left:"0%", width:"100%", height:"80%"}}>
        {listTransaction.map((element)=>{
          return(<ListItem sx={{height:"7%"}}><Test2 element={element}/></ListItem>)
        })}
      </List>
      )}
      
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