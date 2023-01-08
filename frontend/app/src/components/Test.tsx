import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { Button, Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { relative } from "path";
import { SearchBar } from "./SearchBar";
import { Test2 } from "./Test2";
import InfiniteScroll from "react-infinite-scroll-component";





export const Test: FC<{}> = ({}) => {


  const date = new Date()
  const YEAR = date.getFullYear()
  const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()

  const [listTransaction,setListTransaction] = useState(undefined)
  const [page,setPage] = useState(YEAR)
  console.log(YEAR,typeof(YEAR))

  useEffect(() => {
    getElement()
  },[])
//2 possibilité : soit par mois, soit par années,premier essai : par année
  const changePage = (newPage) => {
    console.log(newPage)
  }
//rajouter une limite ...
  const getElement = async () => {
    const query_earn = query(collection(firestore,"test"),orderBy("date","desc"))
    
    let year = []
    let month = []
    let ref_year = YEAR.toString()
    let ref_year1 = YEAR.toString()

    let ref_month = MONTH
    let ref_month1 = MONTH

    let temp = []
    let element;

    const snapshot = await getDocs(query_earn)
    snapshot.forEach((doc) => {
      if(doc.data()){
        element = doc.data()
        // ref_month = element["date"]["mois"]
        // ref_year = element["date"]["année"]

        // if(ref_month !== ref_month1){
        //   ref_month1 = element["date"]["mois"]
        //   month.push(temp)
        //   temp = []

        // }

        // if(ref_year !== ref_year1){
        //   ref_year1 = element["date"]["année"]
        //   year.push(month)
        //   month = []
        //   temp = []
        // }

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

        <List sx={{position:"absolute",top:"15%",left:"0%", width:"100%", height:"80%"}}>
          
          <ListItem sx={{paddingBottom:"1%"}}>

          <Grid container width={"100%"}>
            <Grid item sx={{position:"relative",left:"13%"}}>
                <Typography fontSize={20}>TYPE</Typography>
            </Grid>

           
                    <Grid item sx={{position:"relative",left:"23%"}}>
                        <Typography fontSize={20}>DATE</Typography>
                    </Grid>
                    <Grid item sx={{position:"relative",left:"31%"}}>
                        <Typography fontSize={20}>CATEGORIE</Typography>
                    </Grid>
                    <Grid item sx={{position:"absolute",left:"48%"}}>
                        <Typography fontSize={20}>SOURCE/DESTINATION</Typography>
                    </Grid>
               
            
           
                <Grid item sx={{position:"absolute",left:"68%"}}>
                    <Typography fontSize={20}>DETAIL</Typography>
                </Grid>
           
            <Grid item sx={{position:"absolute",right:"13%"}}>
                <Typography fontSize={20}>MONTANT</Typography>
            </Grid>
        </Grid>



          </ListItem>
          <InfiniteScroll height={"78vh"}
                          next={function () {
                                      throw new Error("Function not implemented.");
                              } } 
                          hasMore={false} 
                          loader={undefined} 
                          dataLength={50}>
            
            {listTransaction.map((element)=>{
              return(<ListItem sx={{height:"7%"}}><Test2 element={element}/></ListItem>)
            })}
            <Button sx={{position:"relative",left:"50%"}}>NEXT</Button>
          </InfiniteScroll>





        
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