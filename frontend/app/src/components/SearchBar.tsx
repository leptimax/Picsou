import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { AppBar, Box, Button, Grid, IconButton, InputBase, TextField, Toolbar, Typography } from "@mui/material";
import { relative } from "path";
import SearchIcon from '@mui/icons-material/Search';


export const SearchBar: FC<{}> = () => {

    const [value,setValue] = useState("")
    // console.log(value)


    const handleSubmit = () => {

      console.log(value)

    }

    return(
      <Box sx={{ flexGrow: 1, position:"absolute",top:"5%", width:"60%",left:"20%" }}>
      <AppBar position="static" sx={{borderRadius:"25px"}}>
        <Toolbar >
          
        <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Rechercher une transaction"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if(e.key === "Enter"){
              handleSubmit()
          }
      }}
      />
          <Button variant="contained" color="warning" sx={{borderRadius:"25px"}} onClick={handleSubmit}>
            <SearchIcon/>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    )

}