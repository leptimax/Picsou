import React, {FC, useContext, useEffect, useState} from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import {Grid, List, ListItem, MenuItem, TextField, Typography } from "@mui/material";
import { SearchBar } from "./SearchBar";
import { Card } from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthContext } from "../App";





export const History: FC<{}> = ({}) => {

  const {user} = useContext(AuthContext)

  const TYPE = ["TOUS","GAINS","DEPENSES"]
  const CATEGORY = {
    "TOUS":["TOUTES","CAF","Salaire","Extra","Loyer","Courses","Essence","Activité/Sortie","Extra"],
    "GAINS":["TOUTES","CAF","Salaire","Extra"],
    "DEPENSES":["TOUTES","Loyer","Courses","Essence","Activité/Sortie","Extra"]
  }

  const MOVEMENT = {
    "GAINS":"provenance",
    "DEPENSES":"destination"
  }

  const LIST_MONTH = ["JANVIER","FEVRIER","MARS","AVRIL","MAI","JUIN","JUILLET","AOUT","SEPTEMBRE","OCTOBRE","NOVEMBRE","DECEMBRE"]

  const date = new Date()
  const YEAR = date.getFullYear()
  const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()

  const [listTransaction,setListTransaction] = useState(undefined)
  const [listTransactionSort,setListTransactionSort] = useState(undefined)
  const [listYear,setListYear] = useState(undefined)


  const [search,setSearch] = useState("")




  const [month,setMonth] = useState(MONTH)
  const [year,setYear] = useState(YEAR)

  const [type,setType] = useState("TOUS")
  const [category,setCategory] = useState("TOUTES")


  useEffect(() => {
    let link = window.location.href.split("/")[3].split("?")
    if(link.length > 1){
      setSearch(link[1])
    }
  },[])


  useEffect(() => {
    getElement()
  },[month,year])

  useEffect(()=>{
    sort()
  },[listTransaction])
 


  useEffect(() => {
    sort() 

  },[type,month,year,category,search,listTransaction])

  useEffect(() => {
    sort()
  },[search])

  const sort = () => {

    if(listTransaction !== undefined){
      let temp = []
      listTransaction.forEach(element => {

        if(type === 'TOUS' && category === "TOUTES"){

          if(element[MOVEMENT[element["type de mouvement"]]].toUpperCase().startsWith(search.toUpperCase())){
            temp.push(element)
          }
          
        }
        else if(type !== "TOUS" && category === "TOUTES"){
          if(element["type de mouvement"] === type && element[MOVEMENT[element["type de mouvement"]]].toUpperCase().startsWith(search.toUpperCase())){
            temp.push(element)
          }
        }
        else if(type === "TOUS" && category !== "TOUTES"){
          if(element["categorie"] === category && element[MOVEMENT[element["type de mouvement"]]].toUpperCase().startsWith(search.toUpperCase())){
            temp.push(element)
          }
        }
        else{
          if((element["type de mouvement"] === type) && (element["categorie"] === category) && element[MOVEMENT[element["type de mouvement"]]].toUpperCase().startsWith(search.toUpperCase())){
            temp.push(element)
          }
        }
        
      });
      setListTransactionSort(temp)
    }

  }


  const handleChangeType = (e) => {
    setType(e.target.value)
  }
  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }
  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }
  const handleChangeMonth = (e) => {
    setMonth(e.target.value)
  }



  

  const getElement = async () => {
    const query_year = query(collection(firestore,user.user.email),orderBy("date","desc"))
    const query_earn = query(collection(firestore,user.user.email),where("date.mois","==",month),where("date.année","==",year))
    
    let temp = []
    let temp_year = []
    let sort = []
    let element;

    const snapshot_year = await getDocs(query_year)
    snapshot_year.forEach(doc => {
      if(doc.data()){
        element = doc.data()
        if(temp_year.includes(element["date"]["année"]) === false){
          temp_year.push(element["date"]["année"])
        }
      }
    });

    const snapshot = await getDocs(query_earn)
    snapshot.forEach((doc) => {
      if(doc.data()){
        element = doc.data()
        temp.push(element)
          
        }
      
        
      })
      sort = temp.sort(function(a,b){
        return b.date.jour - a.date.jour  
      })
    setListTransaction(sort)
    setListTransactionSort(sort)
    setListYear(temp_year)
    
    
    
}
  return(
    <>
      <SearchBar setSearch={setSearch} search={search}/>
      {(listTransactionSort === undefined) ? (<Typography sx={{position:"absolute",top:"40%",left:"40%",fontSize:32}}>aucune entrée disponible</Typography>) : (

        <List sx={{position:"absolute",top:"15%",left:"0%", width:"100%", height:"80%"}}>

          
          
          <ListItem sx={{paddingBottom:"1%"}}>

          <Grid container width={"100%"}>
            <Grid item sx={{position:"relative",left:"12%"}}>
                <TextField  select
                            sx={{fontSize:20}}
                            onChange={handleChangeType}
                            value={type}
                            label="Type">

                {TYPE.map((element) => {
                return (
                  <MenuItem value={element}>{element}</MenuItem>
                )
              })}
                </TextField>
            </Grid>

           




                    <Grid item sx={{position:"relative",left:"17%"}}>
                        <TextField  select
                                sx={{fontSize:20}}
                                onChange={handleChangeYear}
                                value={year}
                                label="Année">

                {listYear !== undefined &&(listYear.map((element) => {
                return (
                  <MenuItem value={element}>{element}</MenuItem>
                )
              }))}
                </TextField>

                <TextField  select
                                sx={{fontSize:20}}
                                onChange={handleChangeMonth}
                                value={month}
                                label="Mois">

                {LIST_MONTH.map((element) => {
                return (
                  <MenuItem value={element}>{element}</MenuItem>
                )
              })}
                </TextField>
                    </Grid>









                    <Grid item sx={{position:"relative",left:"21%"}}>
                    <TextField  select
                                sx={{fontSize:20}}
                                onChange={handleChangeCategory}
                                value={category}
                                label="Catégorie">

                {CATEGORY[type].map((element) => {
                return (
                  <MenuItem  value={element}>{element}</MenuItem>
                )
              })}
                </TextField>
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
          <InfiniteScroll height={"75vh"}
                          next={function () {
                                      throw new Error("Function not implemented.");
                              } } 
                          hasMore={false} 
                          loader={undefined} 
                          dataLength={50}>
            
            {listTransactionSort.length !== 0 ? (
            listTransactionSort.map((element)=>{
              return(<ListItem sx={{height:"7%"}}><Card element={element}/></ListItem>)
            })
          ) : (
            <Typography sx={{position:"absolute",top:"40%",left:"40%",fontSize:32}}>aucune entrée disponible</Typography>
          )

          
          }
          </InfiniteScroll>





        
      </List>
      )}
      
    </>
  )

}
