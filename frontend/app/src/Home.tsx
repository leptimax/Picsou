import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "./App";
import { authorizedFetch } from "./utils/Fetch";


export const Home: FC<{}> = ({}) => {


    const {data,isLoading,error} = useQuery("TEST",() => authorizedFetch("/api/test","GET"))
    const user = useContext(AuthContext)
    console.log("depuis home : ",user)
    return(
        <>
            <Stack>
                {data ? (<p>{data}</p>) : (<p>coucou</p>)}
                
            </Stack>
        </>
    )

}