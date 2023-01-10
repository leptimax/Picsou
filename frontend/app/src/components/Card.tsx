import React, {FC} from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";


const MONTH = {
    "JANVIER":1,
    "FEVRIER":2,
    "MARS":3,
    "AVRIL":4,
    "MAI":5,
    "JUIN":6,
    "JUILLET":7,
    "AOUT":8,
    "SEPTEMBRE":9,
    "OCTOBRE":10,
    "NOVEMBRE":11,
    "DECEMBRE":12

}


export const Card: FC<{element:any}> = ({element}) => {


    const hist = useHistory()
    const handleClick = (id) => {
        hist.push("/information?"+id)
    }

    let detail = "aucun detail disponible"

  return(
    <Button variant="outlined" 
                onClick={() => {handleClick(element["id"])}}
                sx={{position:"absolute",
                      width:"80%",
                      height:"90%",
                      top:"5%",
                      left:"10%", 
                      borderRadius:"20px", 
                      backgroundColor:"rgb(36,36,36)", 
                      borderColor:"rgb(36,36,36)",
                      color:"white"
                    }} 
                      
                      >
        <Grid container width={"100%"}>
            <Grid item sx={{position:"relative",left:"3%"}}>
            {element["type de mouvement"] === "GAINS" ? (
                    <Typography sx={{color:"rgb(51,255,51)"}}>{element["type de mouvement"]}</Typography>
                ) : (
                    <Typography sx={{color:"rgb(255,0,0)"}}>{element["type de mouvement"]}</Typography>
                )}
            </Grid>

            {element["type de mouvement"] === "GAINS" ? (
                <>
                    <Grid item sx={{position:"relative",left:"15%"}}>
                        <Typography>{element["date"]["jour"]} / {MONTH[element["date"]["mois"]]} / {element["date"]["année"]}</Typography>
                    </Grid>
                    <Grid item sx={{position:"relative",left:"25%"}}>
                        <Typography>{element["categorie"]}</Typography>
                    </Grid>
                    <Grid item sx={{position:"absolute",left:"48%"}}>
                        <Typography>{element["provenance"].substring(0,13)}</Typography>
                    </Grid>
                </>
                ) : (
                <>
                    <Grid item sx={{position:"relative",left:"13%"}}>
                        <Typography>{element["date"]["jour"]} / {MONTH[element["date"]["mois"]]} / {element["date"]["année"]}</Typography>
                    </Grid>

                    <Grid item sx={{position:"relative",left:"23%"}}>
                        <Typography>{element["categorie"]}</Typography>
                    </Grid>

                    <Grid item sx={{position:"absolute",left:"48%"}}>
                        <Typography>{element["destination"].substring(0,13)}</Typography>
                    </Grid>
                </>
                )}
            
            {element["detail"] !== "" ? (
                <Grid item sx={{position:"absolute",left:"68%"}}>
                    <Typography>{element["detail"].substring(0,23)}</Typography>
                </Grid>
            ) : (
                <Grid item sx={{position:"absolute",left:"68%"}}>
                    <Typography>aucun détail disponible</Typography>
                </Grid>
            )}
            
            <Grid item sx={{position:"absolute",right:"5%"}}>
                {element["type de mouvement"] === "GAINS" ? (
                    <Typography sx={{color:"rgb(51,255,51)"}}>{parseFloat(element["montant"]).toFixed(2)}€</Typography>
                ) : (
                    <Typography sx={{color:"rgb(255,0,0)"}}>{parseFloat(element["montant"]).toFixed(2)}€</Typography>
                )}
                
            </Grid>
        </Grid>
    </Button>
  )

}



