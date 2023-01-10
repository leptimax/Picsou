import React, {FC, useState} from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, TextField, Typography } from "@mui/material";
import { auth } from "../firebase";
import { SetToken } from "../utils/Auth";





export const Authentication: FC<{setConnect:(value:boolean) =>any}> = ({setConnect}) => {


    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errorPwd,setErrorPwd] = useState(false)
    const [errorMail,setErrorMail] = useState(false)


    const handleSubmit = async () => {

        if(password === ""){
            setErrorPwd(true)
            setPassword("")
        }
        else{
            setErrorPwd(false)
        }
        if(email === ""){
            setErrorMail(true)
            setPassword("")
            setErrorPwd(true)
        }
        else{
            setErrorMail(false)
        }
        if(password !== "" && email !== ""){
           try {
            const userTemp = await signInWithEmailAndPassword(auth,email,password)
            SetToken(userTemp)
            setConnect(true)
           } catch (error) {
            console.log(error)
           }
        }
    }
    

    
    return(

        <>
          <img src="Picsou.png" style={{width:"33vh", 
                                        position:"absolute",
                                        top:"5vh",
                                        left:"40vw"
                                        }}/>  

            <Box
              component="form"
              sx={{
                textAlign:"center",
                '& .MuiTextField-root': {  width: '22.5vw',marginBottom:"1vh" },
                backgroundColor:"rgba(33,33,33,0.75)",
                width:"27.5vw",
                height: errorPwd ? "35vh" : "30vh",
                position:"absolute",
                top:"40vh",
                left:"35.6vw",
                borderRadius:"10px"
              }}
              noValidate
              autoComplete="off"
            >
                
                <Typography variant="h4" sx={{marginTop:"2vh",marginBottom:"2vh"}}>Authentification</Typography>
                    {errorPwd && <p style={{color:"red"}}>Identifiant ou mot de passe incorrect</p>}
                    <TextField
                            required
                            error={errorMail}
                            value={email}
                        id="standard-password-input"
                        label="Email"
                        type="email"
                        autoComplete="current-password"
                        variant="standard"
                        onChange={(e) => {setEmail(e.target.value)}}
                        onKeyDown={(e) => {
                            if(e.key === "Enter"){
                                handleSubmit()
                            }
                        }}
                        />
                        <TextField
                            required
                            error={errorPwd}
                            value={password}
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            onChange={(e) => (setPassword(e.target.value))}
                            onKeyDown={(e) => {
                                if(e.key === "Enter"){
                                    handleSubmit()
                                }
                            }}
                            />

                    <Button  variant="contained" color="warning" sx={{
                        marginTop:"1vh"
                    }} onClick={handleSubmit}
                        >
                        Se Connecter
                    </Button>
            
            </Box>
        </>
    )

}