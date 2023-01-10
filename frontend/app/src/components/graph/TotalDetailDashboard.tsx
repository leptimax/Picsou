import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import ReactEcharts from "echarts-for-react"; 
import { AuthContext } from "../../App";



export const TotalDetailDashboard: FC<{top:string,left:string}> = ({top,left}) => {


    const date = new Date()

    const {user} = useContext(AuthContext)
    const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    const YEAR = date.getFullYear()

    const [extraLoss,setExtraLoss] = useState(0.0)
    const [rent,setRent] = useState(0.0)
    const [shopping,setShopping] = useState(0.0)
    const [oil,setOil] = useState(0.0)
    const [activity, setActivity] = useState(0.0)
    const [extraEarn,setExtraEarn] = useState(0.0)
    const [pay,setPay] = useState(0.0)
    const [gouv,setGouv] = useState(0.0)

    

    useEffect(() => {
          
      getElement()
      
    },[])



    const getElement = async () => {
        
        const query_total = query(collection(firestore,user.user.email),where("date.année","==",YEAR),where("date.mois","==",MONTH))
        

        let extra_loss_temp = 0
        let extra_earn_temp = 0
        let gouv_temp = 0
        let pay_temp = 0
        let shopping_temp = 0
        let rent_temp = 0
        let oil_temp = 0
        let activity_temp = 0

        let element;

        const snapshot = await getDocs(query_total)
        snapshot.forEach((doc) => {
          if(doc.data()){
            element = doc.data()
            switch(element["categorie"]){
                case "CAF":{
                  gouv_temp = gouv_temp + parseFloat(element["montant"])
                  break;
                }
                case "Salaire":{
                  pay_temp = pay_temp + parseFloat(element["montant"])
                  break;
                }
                case "Extra":{
                    if(element["type de mouvement"] === "DEPENSES"){
                        extra_loss_temp = extra_loss_temp + parseFloat(element["montant"])
                    }
                    else{
                        extra_earn_temp = extra_earn_temp + parseFloat(element["montant"])
                    }
                    break;
                }
                case "Courses":{
                    shopping_temp = shopping_temp + parseFloat(element["montant"])
                    break;
                }
                case "Loyer":{
                    rent_temp = rent_temp + parseFloat(element["montant"])
                    break;
                }
                case "Activité/Sortie":{
                    activity_temp = activity_temp + parseFloat(element["montant"])
                    break;
                }
                case "Essence":{
                    oil_temp = oil_temp + parseFloat(element["montant"])
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
        
    }
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
                      
                    
              <ReactEcharts style={{height:"100%",width:"100%",position:"relative",top:"0%",left:"0%"}} option={option_loss} />

        </Stack>
        
        
    )

}