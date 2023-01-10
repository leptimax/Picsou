import React, {FC} from "react";
import { LossChart } from "./graph/LossChart";
import { EarnChart } from "./graph/EarnChart";
import { DetailLossChart } from "./graph/DetailLossChart";
import { DetailEarnChart } from "./graph/DetailEarnChart";


export const Statistics: FC<{}> = ({}) => {

    
  return(
    <>
        <LossChart top={"2.5vh"} left={"10vw"}/>
        <DetailLossChart top={"52.5vh"} left={"10vw"} />
        <EarnChart top={"2.5vh"} right={"7.5vw"}/>
        <DetailEarnChart top={"52.5vh"} right={"7.5vw"}/>
    </>
  )

}

