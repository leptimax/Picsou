import { Stack } from "@mui/system";
import React, {FC, useContext, useEffect, useState} from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase";
import ReactEcharts from "echarts-for-react"; 
import { AuthContext } from "../../App";



export const DetailEarnChart: FC<{top:string,right:string}> = ({top,right}) => {


    const date = new Date()
    const {user} = useContext(AuthContext)
    const MONTH = date.toLocaleString('default', { month: 'long' }).toUpperCase()
    const YEAR = date.getFullYear()

    const [extraEarn,setExtraEarn] = useState(0.0)
    const [pay,setPay] = useState(0.0)
    const [gouv,setGouv] = useState(0.0)


    

    useEffect(() => {
          
      getElement()
      
    },[])

  


    const getElement = async () => {
        
        const query_total = query(collection(firestore,user.user.email),where("date.année","==",YEAR),where("date.mois","==",MONTH))
        

        let extra_earn_temp = 0
        let pay_temp = 0
        let gouv_temp = 0

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
                    extra_earn_temp = extra_earn_temp + parseFloat(element["montant"])  
                    break;
                  }
                
              }
            
          }
        
        })
        setExtraEarn(extra_earn_temp)
        setPay(pay_temp)
        setGouv(gouv_temp)
        
    }
    const option_loss= {
      tooltip: {
        trigger: 'item'
      },
    
      xAxis:{
        data:["Salaire","CAF","Extra"],
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
        text: "Gains Détaillés",
        left:"35%",
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
          ]
          
          },
          
          
      ]
    };


    return(
        <Stack sx={{
                    width:"35vw",
                    height:"45vh",
                    backgroundColor:"rgb(0,0,0,0.3)",
                    position:"absolute",
                    right:right,
                    top:top,
                    borderRadius:"25px"
                    }}>
                      
                    
              <ReactEcharts style={{height:"100%",width:"100%",position:"relative",top:"0%",left:"0%"}} option={option_loss}  />

              
            
        </Stack>
        
        
    )

}