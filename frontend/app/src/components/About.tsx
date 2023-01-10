import { Stack } from "@mui/system";
import React, {FC} from "react";
import {Typography } from "@mui/material";




export const About: FC<{}> = ({}) => {


  return(

    <Stack sx={{width:"125%",position:"relative",left:"-10%"}}>

        <Typography sx={{textAlign:"center",position:"relative",top:"5vh"}} variant="h2">A Propos</Typography>
        <Typography sx={{position:"relative",top:"10vh", fontSize:28}}>
            Le logiciel <b>PICSOU</b> a été développé par l'équipe <i>Dabbing Meerkat Studio</i>. Si vous rencontrez le moindre problème lors de l'utilisation de 
            ce logiciel, veuillez contacter notre service de maintenance à l'adresse suivante : 
        </Typography>
        <Typography sx={{textAlign:"center",position:"relative",top:"13vh", fontSize:28}}>dabbingMeerkatStudio@gmail.com</Typography>
        <img src="Picsou.png" style={{width:"30%",position:"relative",top:"18vh" }}/>
        <img src="DabbingMeerkat.png" style={{width:"23%",position:"absolute",top:"64%",left:"75%" }}/>
        <Typography sx={{fontSize:28,textAlign:"center",position:"relative",top:"25vh"}}><span>&copy;</span>Dabbing Meerkat Studio Tous Droits Réservés</Typography>

    </Stack>

  )

}
