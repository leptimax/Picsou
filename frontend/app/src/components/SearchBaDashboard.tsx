import React, {FC, useState} from "react";
import { AppBar, Box, Button, InputBase, Toolbar } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useHistory } from "react-router-dom";


export const SearchBarDashboard: FC<{}> = () => {

    const history = useHistory()
    const [value,setValue] = useState("")


    const handleSubmit = () => {
      history.push("/history?"+value)
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