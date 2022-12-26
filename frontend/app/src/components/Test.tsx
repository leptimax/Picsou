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

export const Test: FC<{}> = async ({}) => {

  const classes = style()


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




  const snapshot = await bdd.get()
  console.log("coucou",snapshot)
  snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});

  return(
    <>
      <Button>COUCOU</Button>
    </>




  )
}




//   const bdd = collection(firestore,"test")
//   console.log("coucou",process.env)

//   const handleClick = async (e) => {
//     e.preventDefault();
    
//     let data = {
//       message:"coucou"
//     };

//     try {
//       addDoc(bdd,data)
//   } catch(e){
//     console.log(e)
//   }
// }

//     return(
//         <>
//            <Button onClick={handleClick}>test</Button>
//            <p>{process.env.API_KEY}</p>
//         </>
//     )