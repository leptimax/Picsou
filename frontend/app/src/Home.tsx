import { Stack } from "@mui/system";
import React, {FC, useEffect} from "react";
import {useQuery} from 'react-query'
import { authorizedFetch } from "./utils/Fetch";


export const Home: FC<{}> = ({}) => {

    // const { data: stats, isLoading, error } = useQuery("test",
    // () => authorizedFetch('/api/test', 'GET'))

    const {data,isLoading,error} = useQuery("TEST",() => authorizedFetch("/api/test","GET"))
    
    return(
        <Stack>
            {data ? (<p>{data}</p>) : (<p>coucou</p>)}
        </Stack>
    )

}