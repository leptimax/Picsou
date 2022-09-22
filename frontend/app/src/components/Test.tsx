import { Button, CSSObject, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, styled, Theme, useTheme } from "@mui/material"
import React from "react"
import { FC } from "react"

import {addDoc,collection} from "@firebase/firestore"
import { firestore } from "../firebase"

export const Test: FC<{}> = ({}) => {

  const bdd = collection(firestore,"test")
  console.log("coucou",process.env)

  const handleClick = async (e) => {
    e.preventDefault();
    
    let data = {
      message:"coucou"
    };

    try {
      addDoc(bdd,data)
  } catch(e){
    console.log(e)
  }
}

    return(
        <>
           <Button onClick={handleClick}>test</Button>
           <p>{process.env.API_KEY}</p>
        </>
    )
    
}