import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import ReactEcharts from "echarts-for-react"; 
import {Typography } from "@mui/material";
import { AuthContext } from "../../App";



export const LossChart: FC<{top:string,left:string}> = ({top,left}) => {


    const date = new Date()
    const {user} = useContext(AuthContext)
    const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    const YEAR = date.getFullYear()

    const [positionLeft,setPositionLeft] = useState("0%")
    const [extra,setExtra] = useState(0)
    const [rent,setRent] = useState(0)
    const [shopping,setShopping] = useState(0)
    const [oil,setOil] = useState(0)
    const [activity, setActivity] = useState(0)
    const [valueGlobal,setValueGlobal] = useState(0)
    const [size,setSize] = useState(35)
    

    useEffect(() => {
          
      getElement()
      
    },[])

    useEffect(() => {
        
    if(valueGlobal < 10 && valueGlobal >= 0){
        setPositionLeft("43.5%")
    }
    else if((valueGlobal >= 10) && (valueGlobal <100)){
        setPositionLeft("42.3%")
    }
    else if((valueGlobal >= 100) && (valueGlobal < 1000)){
        setPositionLeft("40.5%")
    }
    else if((valueGlobal >= 1000) && (valueGlobal < 10000)){
        setPositionLeft("39%")
    }
    else if((valueGlobal >= 10000) && (valueGlobal < 100000)){
        setPositionLeft("37.5%")
    }
    else if((valueGlobal >= 100000) && (valueGlobal < 1000000)){
        setPositionLeft("37%")
        setSize(31)
    }
    else if((valueGlobal >= 1000000) && (valueGlobal < 10000000)){
        setPositionLeft("36.8%")
        setSize(29)
    }
    else if((valueGlobal >= 10000000) && (valueGlobal < 100000000)){
        setPositionLeft("36.8%")
        setSize(26)
    }

    },[valueGlobal])


    const getElement = async () => {
        
        const query_loss = query(collection(firestore,user.user.email),where("type de mouvement","==","DEPENSES"),where("date.ann??e","==",YEAR),where("date.mois","==",MONTH))
        

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
              case "Activit??/Sortie":{
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
        setActivity(activity_temp)
        setExtra(extra_temp)
        setOil(oil_temp)
        setRent(rent_temp)
        setShopping(shopping_temp)
        setValueGlobal(valueGlobalTemp)
        // setValue(valueGlobalTemp)
        
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
        text: "D??penses",
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
          name: 'D??penses',
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
                return  params.value + "???"
              
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
            { value: rent, name: 'Loyer' },
            { value: shopping, name: 'Courses' },
            { value: oil, name: 'Essences' },
            { value: activity, name: 'Sorties' },
            { value: extra, name: 'Extra' }
          ],
        }
      ]
    };

    // const onChartClick = (params) => {
    //   console.log(params)
    // }

    // const onChartHover = (params) => {
    //   // console.log('Chart clicked', params.data.value);
    //   // setValue(params.data.value)
    // };

    // const onChartOut = () => {
    //   // setValue(valueGlobal)
    // }
  
    // const onEvents = {
    //   click: onChartClick,
    //   mouseover: onChartHover,
    //   mouseout:onChartOut
    // };

    return(
        <Stack sx={{
                    width:"35vw",
                    height:"45vh",
                    backgroundColor:"rgb(0,0,0,0.3)",
                    position:"absolute",
                    left:left,
                    top:top,
                    borderRadius:"25px"
                    }}>
                      
                    
              <ReactEcharts style={{height:"100%",width:"100%",position:"relative",top:"0%",left:"0%"}} option={option_loss} /*onEvents={onEvents}*/ />
              <Typography sx={{position:"absolute",
                                left:positionLeft,
                                top:"45%",
                                textAlign:"center",
                                fontSize:size,
                                fontWeight:"bold",
                                
            }}>{valueGlobal.toFixed(2)}???</Typography>
              
            
        </Stack>
        
        
    )

}