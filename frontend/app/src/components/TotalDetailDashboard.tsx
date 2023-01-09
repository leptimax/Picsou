import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import {useQuery} from 'react-query'
import { AuthContext, userContext } from "../App";
import { authorizedFetch } from "../utils/Fetch";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";
import ReactEcharts from "echarts-for-react"; 
import { Grid, Typography } from "@mui/material";
import { relative } from "path";
import { Test } from "./History";



export const TotalDetailDashboard: FC<{top:string,left:string}> = ({top,left}) => {


    const date = new Date()
    const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    const DAY = date.getDate()
    const YEAR = date.getFullYear()

    const [positionLeft,setPositionLeft] = useState("0%")

    const [earn,setEarn] = useState(0.0)
    const [loss,setLoss] = useState(0.0)

    const [extraLoss,setExtraLoss] = useState(0.0)
    const [rent,setRent] = useState(0.0)
    const [shopping,setShopping] = useState(0.0)
    const [oil,setOil] = useState(0.0)
    const [activity, setActivity] = useState(0.0)
    const [extraEarn,setExtraEarn] = useState(0.0)
    const [pay,setPay] = useState(0.0)
    const [gouv,setGouv] = useState(0.0)

    const [data,setData] = useState(undefined)

    const [valueGlobal,setValueGlobal] = useState(0)
    

    useEffect(() => {
          
      getElement()
      
    },[])

    useEffect(() => {

      if(valueGlobal < 10){
        setPositionLeft("44.2%")
      }
      else if((valueGlobal >= 10) && (valueGlobal <100)){
        setPositionLeft("43.5%")
      }
      else if((valueGlobal >= 100) && (valueGlobal < 1000)){
        setPositionLeft("41.5%")
      }
      else if((valueGlobal >= 1000) && (valueGlobal < 10000)){
        setPositionLeft("39.5%")
      }
      else if((valueGlobal >= 10000) && (valueGlobal < 100000)){
        setPositionLeft("38.5%")
      }

    },[valueGlobal])


    const getElement = async () => {
        
        const query_total = query(collection(firestore,"test"),where("date.année","==",YEAR),where("date.mois","==",MONTH))
        

        let extra_loss_temp = 0
        let extra_earn_temp = 0
        let gouv_temp = 0
        let pay_temp = 0
        let shopping_temp = 0
        let rent_temp = 0
        let oil_temp = 0
        let activity_temp = 0
        let valueGlobalTemp = 0

        let data_temp = []
        let element;

        const snapshot = await getDocs(query_total)
        snapshot.forEach((doc) => {
          if(doc.data()){
            element = doc.data()
            switch(element["categorie"]){
                case "CAF":{
                  gouv_temp = gouv_temp + parseFloat(element["montant"])
                  valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                  break;
                }
                case "Salaire":{
                  pay_temp = pay_temp + parseFloat(element["montant"])
                  valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                  break;
                }
                case "Extra":{
                    if(element["type de mouvement"] === "DEPENSES"){
                        extra_loss_temp = extra_loss_temp + parseFloat(element["montant"])
                    }
                    else{
                        extra_earn_temp = extra_earn_temp + parseFloat(element["montant"])
                    }
                    valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                    break;
                }
                case "Courses":{
                    shopping_temp = shopping_temp + parseFloat(element["montant"])
                    valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                    break;
                }
                case "Loyer":{
                    rent_temp = rent_temp + parseFloat(element["montant"])
                    valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                    break;
                }
                case "Activité/Sortie":{
                    activity_temp = activity_temp + parseFloat(element["montant"])
                    valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                    break;
                }
                case "Essence":{
                    oil_temp = oil_temp + parseFloat(element["montant"])
                    valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                    break;
                }
                
              }
            
          }
        
        })

        setExtraEarn(extra_earn_temp)
        setExtraLoss(extra_loss_temp)
        setGouv(gouv_temp)
        setPay(pay_temp)
        setShopping(shopping_temp)
        setRent(rent_temp)
        setOil(oil_temp)
        setActivity(activity_temp)
        setValueGlobal(valueGlobalTemp)
        setData([pay_temp,gouv_temp,extra_earn_temp,rent_temp,shopping_temp,oil_temp,activity_temp,extra_loss_temp])
        
    }
    console.log(data)
    const option_loss= {
      tooltip: {
        trigger: 'item'
      },
    
      xAxis:{
        data:["Salaire","CAF","Extra","Loyer","Courses","Essence","Sortie","Extra"],
        axisLabel:{
            color:"rgb(255,255,255)"
        }
      },
      yAxis:{
        type:"value",
        axisLabel:{
            color:"rgb(255,255,255)"
        }
      },
      title:{
        text: "Bilan Détaillé",
        left:"37%",
        top:"1%",
        textStyle:{
          show: true,
          color: "white",
          fontWeight: "bold",
          fontSize:30,
        }
      },
      
      series: [
        {
          name: 'Détails',
          type: 'bar',
          data:[
            {
                value:pay,
                itemStyle:{color:"rgb(51,255,51)"}
            },
            {
                value:gouv,
                itemStyle:{color:"rgb(51,255,51)"}
            },
            {
                value:extraEarn,
                itemStyle:{color:"rgb(51,255,51)"}
            },
            {
                value:rent,
                itemStyle:{color:"rgb(255,0,0)"}
            },
            {
                value:shopping,
                itemStyle:{color:"rgb(255,0,0)"}
            },
            {
                value:oil,
                itemStyle:{color:"rgb(255,0,0)"}
            },
            {
                value:activity,
                itemStyle:{color:"rgb(255,0,0)"}
            },
            {
                value:extraLoss,
                itemStyle:{color:"rgb(255,0,0)"}
            },
          ]
          
          },
          
          
      ]
    };

    const onChartClick = (params) => {
      console.log(params)
    }

    const onChartHover = (params) => {
      // console.log('Chart clicked', params.data.value);
      // setValue(params.data.value)
    };

    const onChartOut = () => {
      // setValue(valueGlobal)
    }
  
    const onEvents = {
      click: onChartClick,
      mouseover: onChartHover,
      mouseout:onChartOut
    };

    return(
        <Stack sx={{
                    width:"40vw",
                    height:"50vh",
                    backgroundColor:"rgb(0,0,0,0.3)",
                    position:"relative",
                    left:left,
                    top:top,
                    borderRadius:"25px"
                    }}>
                      
                    
              <ReactEcharts style={{height:"100%",width:"100%",position:"relative",top:"0%",left:"0%"}} option={option_loss} onEvents={onEvents} />
              {/* <Typography sx={{position:"absolute",
                                left:positionLeft,
                                top:"45%",
                                textAlign:"center",
                                fontSize:35,
                                fontWeight:"bold",
                                
            }}>{valueGlobal.toFixed(2)}€</Typography> */}
              
            
        </Stack>
        
        
    )

}