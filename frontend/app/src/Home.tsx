import { Stack } from "@mui/system";
import React, {FC} from "react";
import { TotalDashboard } from "./components/graph/TotalDashboard";
import { ButtonDashboard } from "./components/ButtonDashboard";
import { SearchBarDashboard } from "./components/SearchBaDashboard";
import { TotalDetailDashboard } from "./components/graph/TotalDetailDashboard";

export const Home: FC<{}> = ({}) => {



    return(
        <Stack>
            
            <ButtonDashboard/>
            <SearchBarDashboard/>
            <TotalDashboard top={"44vh"} left={"-12vw"}/>
            <TotalDetailDashboard top={"-6vh"} left={"38vw"}/>
            
        </Stack>
    )

}