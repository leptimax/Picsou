import React, {FC, useEffect} from "react";


export const Home: FC<{}> = ({}) => {

    useEffect(() => {
        fetch("/").then((res) => console.log("a que coucou",res))
    },[])
    return(
        <p>coucou</p>
    )

}