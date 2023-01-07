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




export const DashboardEarn: FC<{top:string,left:string}> = ({top,left}) => {


    const date = new Date()
    const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    const DAY = date.getDate()
    const YEAR = date.getFullYear()

    const [positionLeft,setPositionLeft] = useState("0%")

    const [value,setValue] = useState(0.0)
    const [extra,setExtra] = useState(0.0)
    const [pay,setPay] = useState(0.0)
    const [gouv,setGouv] = useState(0.0)
    const [valueGlobal,setValueGlobal] = useState(0.0)
    

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
        const query_earn = query(collection(firestore,"test"),where("type de mouvement","==","GAINS"),where("date.année","==",YEAR),where("date.mois","==",MONTH))
        

        let extra_temp = 0
        let pay_temp = 0
        let gouv_temp = 0
        let valueGlobalTemp = 0
        let element;

        const snapshot = await getDocs(query_earn)
        snapshot.forEach((doc) => {
          if(doc.data()){
            element = doc.data()
            switch(element["categorie"]){
              case "Extra":{
                extra_temp = extra_temp + parseFloat(element["montant"])
                valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                break;
              }
              case "CAF/Bourse/Aide Gouv":{
                gouv_temp = gouv_temp + parseFloat(element["montant"])
                valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                break;
              }
              case "Salaire":{
                pay_temp = pay_temp + parseFloat(element["montant"])
                valueGlobalTemp = valueGlobalTemp  + parseFloat(element["montant"])
                break;
              }
              
            }
            
          }
        
        })
        setPay(pay_temp)
        setExtra(extra_temp)
        setGouv(gouv_temp)
        setValueGlobal(valueGlobalTemp)
        
    }

    const option_loss= {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '94%',
        left: 'center',
        textStyle:{
          color:"white",
          fontSize:17
          
        }
      },
      title:{
        text: "Gains",
        left:"43%",
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
          name: 'Gains',
          type: 'pie',
          radius: ['45%', '70%'],
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
            fontSize:15,
            formatter: function (params){
              return  params.value + "€"
            
           },
            // position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 30,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true
          },
          data: [
            { value: gouv, name: 'CAF' },
            { value: pay, name: 'Salaire' },
            { value: extra, name: 'Extra' },
          ],
        }
      ]
    };

    const onChartClick = (params) => {
      console.log(params)
    }

    const onChartHover = (params) => {
      // console.log('Chart clicked', params.data.value);
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
              <Typography sx={{position:"absolute",
                                left:positionLeft,
                                top:"45%",
                                textAlign:"center",
                                fontSize:35,
                                fontWeight:"bold",
                                
            }}>{valueGlobal.toFixed(2)}€</Typography>
            
        </Stack>
        
        
    )

}