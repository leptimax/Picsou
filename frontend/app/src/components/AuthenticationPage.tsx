import { Stack } from "@mui/system";
import React, {FC, useEffect, useState} from "react";

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { relative } from "path";
import { auth } from "../firebase";


export const Authentication: FC<{
                                    setUser:(value:object)=>any,
                                    setConnect:(value:boolean) =>any
                                }> = ({setUser,setConnect}) => {


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
            localStorage.setItem("user",JSON.stringify(userTemp))
            setConnect(true)
           } catch (error) {
            console.log(error)
           }
        }
    }
    

    
    return(

        <>
          <img src="Picsou.png" style={{width:"300px", 
                                        position:"absolute",
                                        top:"5vh",
                                        left:"40vw"
                                        }}/>  

            <Box
              component="form"
              sx={{
                textAlign:"center",
                '& .MuiTextField-root': {  width: '90%',marginBottom:"20px" },
                backgroundColor:"rgba(33,33,33,0.75)",
                width:"25vw",
                height:"30vh",
                position:"absolute",
                top:"40vh",
                left:"35.6vw",
                borderRadius:"10px"
              }}
              noValidate
              autoComplete="off"
            >
                
                <Typography variant="h4" sx={{marginTop:"20px",marginBottom:"20px"}}>Authentification</Typography>
                    
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
                            />

                    <Button  variant="contained" color="warning" sx={{
                        marginTop:"10px"
                    }} onClick={handleSubmit}
                        >
                        Se Connecter
                    </Button>
            
            </Box>
        </>
    )

}