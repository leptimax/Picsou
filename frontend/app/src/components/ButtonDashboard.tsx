import React, {FC} from "react";
import {Button, Typography } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useHistory } from "react-router-dom";

export const ButtonDashboard: FC<{}> = () => {


    const history = useHistory()
    
    const handleClickAdd = () => {
        history.push("/add")
    }

    const handleClickHistory = () => {
        history.push("/history")
    }

    const handleClickStatistic = () => {
        history.push("/statistics")
    }

    return(
      <>
        <Button variant="outlined" 
                onClick={handleClickAdd}
                sx={{position:"absolute",
                      width:"15%",
                      height:"15%",
                      top:"20%",
                      left:"10%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} 
                      >
          <AddIcon fontSize="large" sx={{color:"white", marginLeft:"5%"}} />
          <Typography sx={{color:"white", fontSize:"20px"}}>Nouvelle transaction</Typography>
        </Button>

        <Button variant="outlined" 
                onClick={handleClickHistory}
                sx={{position:"absolute",
                      width:"15%",
                      height:"15%",
                      top:"20%",
                      left:"44%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} >
          <HistoryIcon fontSize="large" sx={{color:"white", }} />
          <Typography sx={{color:"white", fontSize:"20px", paddingLeft:"20%", marginRight:"10%"}}>Historique</Typography>
        </Button>

        <Button variant="outlined" 
                onClick={handleClickStatistic}
                sx={{position:"absolute",
                      width:"15%",
                      height:"15%",
                      top:"20%",
                      left:"77.5%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)"}} >
          <BarChartIcon fontSize="large" sx={{color:"white"}} />
          <Typography sx={{color:"white", fontSize:"20px", paddingLeft:"10%", marginRight:"10%"}}>Statistiques</Typography>
        </Button>
      </>
    )

}