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



export const DashboardLoss: FC<{top:string,left:string}> = ({top,left}) => {


    const date = new Date()
    const months = date.getMonth()
    const year = date.getFullYear()

    const [positionLeft,setPositionLeft] = useState("0%")

    const [value,setValue] = useState(0.0)
    const [extra,setExtra] = useState(0)
    const [rent,setRent] = useState(0)
    const [shopping,setShopping] = useState(0)
    const [oil,setOil] = useState(0)
    const [activity, setActivity] = useState(0)
    const [valueGlobal,setValueGlobal] = useState(0)
    

    useEffect(() => {
          
      getElement()
      
    },[])

    useEffect(() => {

      if(value < 10){
        setPositionLeft("44.2%")
      }
      else if((value >= 10) && (value <100)){
        setPositionLeft("43.5%")
      }
      else if((value >= 100) && (value < 1000)){
        setPositionLeft("41.5%")
      }
      else if((value >= 1000) && (value < 10000)){
        setPositionLeft("39.5%")
      }
      else if((value >= 10000) && (value < 100000)){
        setPositionLeft("37.5%")
      }

    },[value])


    const getElement = async () => {
        
        const query_loss = query(collection(firestore,"test"),where("type de mouvement","==","DEPENSES"))
        

        let extra_temp = 0
        let rent_temp = 0
        let shopping_temp = 0
        let oil_temp = 0
        let activity_temp = 0
        let valueGlobalTemp = 0
        let element;

        const snapshot = await getDocs(query_loss)
        snapshot.forEach((doc) => {
          if(doc.data()){
            element = doc.data()
            switch(element["categorie"]){
              case "Extra":{
                extra_temp = extra_temp + parseFloat(element["montant"])
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
              case "Essences":{
                oil_temp = oil_temp + parseFloat(element["montant"])
                valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                break;
              }
            }
            
          }
        
        })
        setActivity(activity_temp)
        setExtra(extra_temp)
        setOil(oil_temp)
        setRent(rent_temp)
        setShopping(shopping_temp)
        setValueGlobal(valueGlobalTemp)
        setValue(valueGlobalTemp)
        
    }

    const option_loss= {
      tooltip: {
        trigger: 'item'
      },
      title:{
        text: "Dépenses",
        left:"40%",
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
          name: 'Dépenses',
          type: 'pie',
          radius: ['50%', '80%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            color:"#fff",
            fontWeight:"bold",
            fontSize:12,
            // position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 24,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: rent, name: 'Loyer' },
            { value: shopping, name: 'Courses' },
            { value: oil, name: 'Essences' },
            { value: activity, name: 'Sorties' },
            { value: extra, name: 'Extra' }
          ],
        }
      ]
    };

    const onChartClick = (params) => {
      console.log(params)
    }

    const onChartHover = (params) => {
      console.log('Chart clicked', params.data.value);
      setValue(params.data.value)
    };

    const onChartOut = () => {
      setValue(valueGlobal)
    }
  
    const onEvents = {
      click: onChartClick,
      mouseover: onChartHover,
      mouseout:onChartOut
    };

    return(
      <Stack>
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
              <Typography sx={{position:"absolute",
                                left:positionLeft,
                                top:"45%",
                                textAlign:"center",
                                fontSize:35,
                                fontWeight:"bold",
                                
            }}>{value.toFixed(2)}€</Typography>
            
        </Stack>
        
      </Stack>
        
    )

}