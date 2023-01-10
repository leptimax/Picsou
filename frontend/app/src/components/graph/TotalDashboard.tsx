import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import ReactEcharts from "echarts-for-react"; 
import { Typography } from "@mui/material";
import { AuthContext } from "../../App";




export const TotalDashboard: FC<{top:string,left:string}> = ({top,left}) => {


    const date = new Date()

    const {user} = useContext(AuthContext)
    const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    const YEAR = date.getFullYear()

    const [positionLeft,setPositionLeft] = useState("0%")

    const [earn,setEarn] = useState(0.0)
    const [loss,setLoss] = useState(0.0)
    const [size,setSize] = useState(35)
    const [color,setColor] = useState("white")
    const [valueGlobal,setValueGlobal] = useState(0.0)
    

    useEffect(() => {
          
      getElement()
      
    },[])

    useEffect(() => {
        
        if(valueGlobal <= -1000000 && valueGlobal > -10000000){
            setPositionLeft("38.2%")
            setSize(27)
        }
        else if(valueGlobal <= -100000 && valueGlobal > -1000000){
            setPositionLeft("38.2%")
            setSize(30)
        }
        else if(valueGlobal <= -10000 && valueGlobal > -100000){
            setPositionLeft("38.2%")
        }
        else if(valueGlobal <= -1000 && valueGlobal > -10000){
            setPositionLeft("39.2%")
        }
        else if(valueGlobal <= -100 && valueGlobal > -1000){
            setPositionLeft("40.2%")
        }
        else if(valueGlobal <= -10 && valueGlobal > -100){
            setPositionLeft("41.2%")
        }
        else if(valueGlobal < 0 && valueGlobal > -10){
            setPositionLeft("43.2%")
        }
        else if(valueGlobal < 10 && valueGlobal >= 0){
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
        else if((valueGlobal >= 100000) && (valueGlobal < 1000000)){
            setPositionLeft("37.5%")
        }
        else if((valueGlobal >= 1000000) && (valueGlobal < 10000000)){
            setPositionLeft("37.8%")
            setSize(30)
        }
        else if((valueGlobal >= 10000000) && (valueGlobal < 100000000)){
            setPositionLeft("38.2%")
            setSize(27)
        }

        if(valueGlobal >= 0){
            setColor("rgb(51,255,51)")
        }
        else{
            setColor("rgb(255,0,0)")
        }

    },[valueGlobal])


    const getElement = async () => {
        const query_total = query(collection(firestore,user.user.email),where("date.année","==",YEAR),where("date.mois","==",MONTH))
        

        let earn_temp = 0
        let loss_temp = 0
        let valueGlobalTemp = 0
        let element;

        const snapshot = await getDocs(query_total)
        snapshot.forEach((doc) => {
          if(doc.data()){
            element = doc.data()
            switch(element["type de mouvement"]){
              case("GAINS"):{
                earn_temp = earn_temp + parseFloat(element["montant"])
                valueGlobalTemp = valueGlobalTemp + parseFloat(element["montant"])
                break
              }
              case("DEPENSES"):{
                loss_temp = loss_temp + parseFloat(element["montant"])
                valueGlobalTemp = valueGlobalTemp - parseFloat(element["montant"])
                break
              }
              
            }
            
          }
        
        })
        setEarn(earn_temp)
        setLoss(loss_temp)
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
        text: "Bilan",
        left:"44%",
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
          name: 'Bilan',
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
            { value: earn, name: 'Bénéfices' },
            { value: loss, name: 'Dépenses' },
          ],
        }
      ]
    };

    // const onChartClick = (params) => {
    //   console.log(params)
    // }

    // const onChartHover = (params) => {
    //   // console.log('Chart clicked', params.data.value);
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
                    width:"40vw",
                    height:"50vh",
                    backgroundColor:"rgb(0,0,0,0.3)",
                    position:"relative",
                    left:left,
                    top:top,
                    borderRadius:"25px"
                    }}>
                      
                    
              <ReactEcharts style={{height:"100%",width:"100%",position:"relative",top:"0%",left:"0%"}} option={option_loss} /*onEvents={onEvents} *//>
              <Typography sx={{position:"absolute",
                                left:positionLeft,
                                top:"45%",
                                textAlign:"center",
                                fontSize:size,
                                fontWeight:"bold",
                                color:color
                                
            }}>{valueGlobal.toFixed(2)}€</Typography>
            
        </Stack>
        
        
    )

}