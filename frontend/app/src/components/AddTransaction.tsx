import { Button, CSSObject, Drawer, FormControl, Grid, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Stack, styled, TextField, Theme, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import { makeStyles } from "@mui/styles"

import {addDoc,collection} from "@firebase/firestore"
import { firestore } from "../firebase"
import { Box } from "@mui/system"
import { relative } from "path"
import { useHistory } from "react-router-dom"


const style = makeStyles({
  customInputLabel: {
    "& legend": {
      visibility: "visible"
    }
  }
});

export const AddTransaction: FC<{}> = ({}) => {

  const classes = style()

  


  const maxYear = "2200"
  const minYear = "1970"
  const TYPE = ["AUCUN","GAIN","DEPENSES"]
  const CATEGORY = {

    "GAIN":["AUCUNE","CAF/Bourse/Aide Gouv","Cours Particuliers","Remboursements","Salaire","Extra"],
    "DEPENSES":["AUCUNE","Loyer","Courses","Essences","Activité/Sortie","Extra"]

  }
  const DAY = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
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
  const [month,setMonth] = useState("JANVIER")
  const [day,setDay] = useState("1")
  const [year,setYear] = useState("1970")
  const [destination,setDestination] = useState("")
  const [amount,setAmount] = useState(0)
  const [details,setDetails] = useState("")

  const [errorType,setErrorType] = useState(false)
  const [errorCategory,setErrorCategory] = useState(false)
  const [errorDestination,setErrorDestination] = useState(false)
  const [errorAmount,setErrorAmount] = useState(false)

  const bdd = collection(firestore,"test")
  const history = useHistory()

  useEffect(() => {
    if(type === "AUCUN"){
      setCategory("AUCUNE")
      setMonth("JANVIER")
      setDay("1")
      setYear("1970")
      setDestination("")
      setAmount(0)
      setDetails("")
    }
  },[type])

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

      let data = {
        "date":{"année":year,
                "mois":month,
                "jour":day
              },
        "type de mouvement":type,
        "categorie":category,
        "destination":destination,
        "montant":amount,
        "detail":details
      };

      try {
        addDoc(bdd,data)
    } catch(e){
      console.log(e)
    }

    setErrorDestination(false)
    setErrorAmount(false)
    setErrorType(false)
    setErrorCategory(false)

    history.push("/")
  }

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
                            label="Categorie"
                            value={category}
                            onChange={handleChangeCategory}
                            helperText="Sélectionner la catégorie de votre mouvement"  >
                  {
                    (type === "GAIN" ? (
                      CATEGORY.GAIN.map((element) => {
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
          {type === "GAIN" ? 
            
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
            variant="contained" color="warning" 
            type="sublit"
            onClick={handleSubmit}
            sx={{ 
                  width:"10vw",
                  position:"absolute",
                  right:"5vw",
                  bottom:"5vh"
            }} >
                  Valider
    </Button>
    </>
  )
}