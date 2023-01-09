import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "./App";
import { authorizedFetch } from "./utils/Fetch";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { DashboardLoss } from "./components/LossChart";
import { DashboardEarn } from "./components/EarnChart";
import { TotalDashboard } from "./components/TotalDashboard";
import { SearchBar } from "./components/SearchBar";
import { ButtonDashboard } from "./components/ButtonDashboard";
import { SearchBarDashboard } from "./components/SearchBaDashboard";
import { TotalDetailDashboard } from "./components/TotalDetailDashboard";

export const Home: FC<{}> = ({}) => {


    const {data,isLoading,error} = useQuery("TEST",() => authorizedFetch("/api/test","GET"))
    const user = useContext(AuthContext)
    const [search,setSearch] = useState("")

    return(
        <Stack>
            
            {/* <Test/> */}
            <ButtonDashboard/>
            <SearchBarDashboard/>
            <TotalDashboard top={"44vh"} left={"-12vw"}/>
            <TotalDetailDashboard top={"-6vh"} left={"38vw"}/>
            
        </Stack>
    )

}