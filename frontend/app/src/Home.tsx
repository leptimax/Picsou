import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "./App";
import { authorizedFetch } from "./utils/Fetch";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export const Home: FC<{}> = ({}) => {


    const {data,isLoading,error} = useQuery("TEST",() => authorizedFetch("/api/test","GET"))
    const user = useContext(AuthContext)
    

    return(
        <>
            <Stack>
                {data ? (<p>{data}</p>) : (<p>coucou</p>)}
                
            </Stack>
        </>
    )

}