import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "./App";
import { authorizedFetch } from "./utils/Fetch";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { DashboardLoss } from "./components/DashboardLoss";
import { DashboardEarn } from "./components/DashboardEarn";
import { Test } from "./components/History";
import { SearchBar } from "./components/SearchBar";
import { ButtonDashboard } from "./components/ButtonDashboard";
import { SearchBarDashboard } from "./components/SearchBaDashboard";

export const Home: FC<{}> = ({}) => {


    const {data,isLoading,error} = useQuery("TEST",() => authorizedFetch("/api/test","GET"))
    const user = useContext(AuthContext)
    const [search,setSearch] = useState("")

    return(
        <Stack>
            
            {/* <Test/> */}
            <ButtonDashboard/>
            <SearchBarDashboard/>
            <DashboardLoss top={"44vh"} left={"-12vw"}/>
            <DashboardEarn top={"-6vh"} left={"38vw"}/>
        </Stack>
    )

}