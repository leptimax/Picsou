import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "./App";
import { authorizedFetch } from "./utils/Fetch";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

export const Home: FC<{}> = async ({}) => {


    const {data,isLoading,error} = useQuery("TEST",() => authorizedFetch("/api/test","GET"))
    const user = useContext(AuthContext)
    

    const col = collection(firestore,"test")
    console.log("collection : ", col)
    // const docs = await getDocs(col)
    // console.log("test : ",docs)
    
    // const querySnapshot = await getDocs(collection(firestore,"test"));
    // querySnapshot.forEach((doc) => {
    // // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    // });

    return(
        <>
            <Stack>
                {data ? (<p>{data}</p>) : (<p>coucou</p>)}
                
            </Stack>
        </>
    )

}