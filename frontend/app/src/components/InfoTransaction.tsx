import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, MenuItem, Stack, TextField} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { FC } from "react"

import {collection, deleteDoc} from "@firebase/firestore"
import { firestore } from "../firebase"
import { Box } from "@mui/system"
import { useHistory } from "react-router-dom"
import { doc, getDocs, query, setDoc, where } from "firebase/firestore"
import { AuthContext } from "../App"


export const InfoTransaction: FC<{}> = ({}) => {

  const date = new Date()
  const {user} = useContext(AuthContext)
  const ACTUAL_MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
  const ACTUAL_DAY = date.getDate()
  const ACTUAL_YEAR = date.getFullYear()
  


  const maxYear = "2200"
  const minYear = "1970"
  const TYPE = ["AUCUN","GAINS","DEPENSES"]
  const CATEGORY = {

    "GAINS":["AUCUNE","CAF","Salaire","Extra"],
    "DEPENSES":["AUCUNE","Loyer","Courses","Essence","Activité/Sortie","Extra"]

  }
  const MONTH = {
    "JANVIER":{
      "days":31,
      "label":"JANVIER"
    },
    "FEVRIER":{
      "days":29,
      "label":"FEVRIER"
    },
    "MARS":{
      "days":31,
      "label":"MARS"
    },
    "AVRIL":{
      "days":30,
      "label":"AVRIL"
    },
    "MAI":{
      "days":31,
      "label":"MAI"
    },
    "JUIN":{
      "days":30,
      "label":"AVRIL"
    },
    "JUILLET":{
      "days":31,
      "label":"JUILLET"
    },
    "AOUT":{
      "days":31,
      "label":"AOUT"
    },
    "SEPTEMBRE":{
      "days":30,
      "label":"SEPTEMBRE"
    },
    "OCTOBRE":{
      "days":31,
      "label":"OCTOBRE"
    },
    "NOVEMBRE":{
      "days":30,
      "label":"NOVEMBRE"
    },
    "DECEMBRE":{
      "days":31,
      "label":"DECEMBRE"
    }
  }
  const [choiceType,setChoiceType] = useState(true)
  const [type,setType] = useState("AUCUN")
  const [category,setCategory] = useState("AUCUNE")
  const [month,setMonth] = useState(ACTUAL_MONTH)
  const [day,setDay] = useState(ACTUAL_DAY.toString())
  const [year,setYear] = useState(ACTUAL_YEAR.toString())
  const [destination,setDestination] = useState("")
  const [amount,setAmount] = useState(0)
  const [details,setDetails] = useState("")

  const [errorType,setErrorType] = useState(false)
  const [errorCategory,setErrorCategory] = useState(false)
  const [errorDestination,setErrorDestination] = useState(false)
  const [errorAmount,setErrorAmount] = useState(false)
  const [open,setOpen] = useState(false)

  const [id,setId] = useState("")

  
  const history = useHistory()

  useEffect(() => {
    const link = window.location.href.split("/")[3].split("?")[1]
    setId(link)
  },[])

  useEffect(() => {

    getInfo()
  },[id])

  useEffect(() => {
    if(type === "AUCUN"){
      setCategory("AUCUNE")
      setMonth(ACTUAL_MONTH)
      setDay(ACTUAL_DAY.toString())
      setYear(ACTUAL_YEAR.toString())
      setDestination("")
      setAmount(0)
      setDetails("")
    }
  },[type])

  const getInfo = async () => {
    const query_info = query(collection(firestore,user.user.email),where("id","==",id.toString()))

    let temp = []
    let element;

    const snapshot = await getDocs(query_info)
    snapshot.forEach((doc) => {
      if(doc.data()){
        element = doc.data()
        setType(element["type de mouvement"])
        setCategory(element["categorie"])
        setAmount(parseFloat(element["montant"]).toFixed(2))
        setDay(element["date"]["jour"])
        setMonth(element["date"]["mois"])
        setYear(element["date"]["année"])
        setDetails(element["detail"])
        setChoiceType(false)
    
        if(element["type de mouvement"] === "GAINS"){
            setDestination(element["provenance"])
        }
        else{
            setDestination(element["destination"])
        }
        }
        
        
      })

    
  }

  const handleChangeType = (e) => {
    setType(e.target.value)
    if(e.target.value === "AUCUN"){
      setChoiceType(true)
    }
    else{
      setChoiceType(false)
    }
    
  }





  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }


  const handleChangeDay = (e) => {
    if(e.target.value > MONTH[month]["days"]){
      setDay(MONTH[month]["days"])
    }
    else if(e.target.value < "1"){
      setDay("1")
    }
    else{
      setDay(e.target.value)
    }
  }

  const handleChangeMonth = (e) => {
    setMonth(e.target.value)
  }

  const handleChangeYear = (e) => {
    if(parseInt(e.target.value) < parseInt(minYear)){
      setYear(minYear)
    }
    else if(parseInt(e.target.value) > parseInt(maxYear)){
      setYear(maxYear)
    }
    else{
      setYear(e.target.value)
    }
  }

  const handleChangeAmount = (e) => {
    if(! isNaN(e.target.value))
      setAmount(e.target.value)
  }

  const handleChangeDetails = (e) => {
    setDetails(e.target.value)
  }

  const handleChangeDestination = (e) => {
    setDestination(e.target.value)
  }

  const handleSubmit = async () => {

    if(destination === ""){
      setErrorDestination(true)
    }
    else{
      setErrorDestination(false)
    }
    if(amount === 0){
      setErrorAmount(true)
    }
    else{
      setErrorAmount(false)
    }
    if(type === "AUCUN"){
      setErrorType(true)
    }
    else{
      setErrorType(false)
    }
    if(category === "AUCUNE"){
      setErrorCategory(true)
    }
    else{
      setErrorCategory(false)
    }
    
    if ((destination !== "") && (amount !== 0) && (type !== "AUCUN") && (category !== "AUCUNE")){

      let data = {}
      if(type === "GAINS"){
        data = {
          "id":id,
          "date":{"année":parseInt(year),
                  "mois":month,
                  "jour":parseInt(day)
                },
          "type de mouvement":type,
          "categorie":category,
          "provenance":destination,
          "montant":amount,
          "detail":details
        };
      }
      else{
        data = {
          "id":id,
          "date":{"année":parseInt(year),
                  "mois":month,
                  "jour":parseInt(day)
                },
          "type de mouvement":type,
          "categorie":category,
          "destination":destination,
          "montant":amount,
          "detail":details
        };
        
      }
      

      try {
        const info = doc(firestore,user.user.email,id)
        await deleteDoc(info)
        const bdd = doc(firestore,user.user.email,id)
        await setDoc(bdd,data)
    } catch(e){
      console.log(e)
    }

    setErrorDestination(false)
    setErrorAmount(false)
    setErrorType(false)
    setErrorCategory(false)

    history.push("/history")
  }

}

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = async() => {
    try{
      const info = doc(firestore,user.user.email,id)
      await deleteDoc(info)
    }
    catch(e){
      console.log(e)
    }
    setOpen(false)
    history.push("/history")
    
  }

  return(
    <>
      <Box
      component="form"
      sx={{
        textAlign:"center",
      position:"absolute",
      top:"10vh",
      left:"25vw"
      
      }}
      noValidate
      autoComplete="off"
    >
      <Stack sx={{position:"relative",
                  left:"15vw"
            }}>
          <TextField      
                        sx={{width:"20vw"}}
                        error={errorType}
                        select
                        value={type}
                        onChange={handleChangeType}
                        label="Type"
                        helperText="Sélectionner un type de mouvement monétaire"

            >
              {TYPE.map((element) => {
                return (
                  <MenuItem key={element} value={element}>{element}</MenuItem>
                )
              })}

          </TextField>
        
          <Grid sx={{marginTop:"10vh",
                      position:"relative",
                      left:"-18vw"
                    }}>
            <TextField   sx={{marginRight:"3vw",
                              marginLeft:"5vw",
                                width:"20vw"
                              }}  
                            select
                            error={errorCategory}
                            disabled={choiceType}
                            label="Catégorie"
                            value={category}
                            onChange={handleChangeCategory}
                            helperText="Sélectionner la catégorie de votre mouvement"  >
                  {
                    (type === "GAINS" ? (
                      CATEGORY.GAINS.map((element) => {
                        return(
                          <MenuItem key={element} value={element}>{element}</MenuItem>
                        )
                      })
                    ) : (
                      CATEGORY.DEPENSES.map((element) => {
                        return(
                          <MenuItem key={element} value={element}>{element}</MenuItem>
                        )
                      })
                    ))
                  }

            </TextField>
            <TextField type="number"
                        label="Jour"
                        value={day}
                        InputProps={{inputProps:{min:1,max:MONTH[month]["days"]}}}
                        onChange={handleChangeDay}
                        disabled={choiceType}
                        sx={{width:"5vw !important",marginLeft:"4vw"}}
            >
              
            </TextField>
            <TextField  
                            select
                            value={month}
                            disabled={choiceType}
                            helperText="Rentrer la date du mouvement"
                            onChange={handleChangeMonth}
                            label="Mois"
                            sx={{width:"10vw !important",
                                  marginLeft:"0.5vw",
                                  marginRight:"0.5vw"      
                          }}
            >
              {
                
                Object.keys(MONTH).map((element)=>{
                  return (
                    <MenuItem key={MONTH[element]["label"]} value={MONTH[element]["label"]}>{MONTH[element]["label"]}</MenuItem>
                  )
                })
              }
                              

                            </TextField>
            <TextField type="number"
                        label="Année"
                        value={year}
                        disabled={choiceType}
                        onChange={handleChangeYear}
                        InputProps={{inputProps:{min:minYear,max:maxYear}}}
                        
                        sx={{width:"7vw !important"}}
                        />
      
          </Grid>
          {type === "GAINS" ? 
            
            ( <TextField      sx={{width:"20vw",
                                    marginTop:"5vh"
                                  }}
                              error={errorDestination}
                              disabled={choiceType}
                              value={destination}
                              onChange={handleChangeDestination}
                              label="Provenance"/> ) : (

              <TextField        sx={{width:"20vw",
                                      marginTop:"5vh"
                                    }}
                                value={destination}
                                error={errorDestination}
                                onChange={handleChangeDestination}
                                disabled={choiceType}
                                label="Destination"/>
                              )}

            <TextField    
                              
                              sx={{width:"15vw",
                                marginTop:"5vh",
                                position:"relative",
                                left:"2.5vw"
                              }}
                              type="number"
                              label="Montant en euros"
                              value={amount}
                              error={errorAmount}
                              onChange={handleChangeAmount}
                              disabled={choiceType}
                              inputProps={{inputProps:{min:0}}}
                              />
            
            
          <TextField sx={{ marginTop:"5vh",
                          width:"53vw",
                          position:"relative",
                          left:"-15vw"
                        }}
                        value={details}
                        onChange={handleChangeDetails}
                        multiline
                        rows={2}
                        maxRows={5}
                        label="Détail"
                        disabled={choiceType}
                        />
          
      </Stack>
      
           
    </Box>
    <Button  
            variant="contained" color="error" 
            type="submit"
            onClick={handleClickOpen}
            sx={{ 
                  color:"black",
                  width:"10vw",
                  position:"absolute",
                  left:"10vw",
                  bottom:"5vh"
            }} >
                  Supprimer
    </Button>

    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-delete-transaction" sx={{textAlign:"center"}}>
          Avertissement
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-delete-description">
            Vous êtes sur le point de supprimer cette transaction, souhaitez vous continuer ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleDelete} autoFocus sx={{color:"red"}}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>


    <Button  
            variant="contained" color="warning" 
            type="submit"
            onClick={handleSubmit}
            sx={{ 
                  width:"10vw",
                  position:"absolute",
                  right:"5vw",
                  bottom:"5vh"
            }} >
                  Modifier
    </Button>
    </>
  )
}