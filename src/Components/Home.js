import React, { useState } from "react";
import "../App.css";
import { UilTear,UilWind } from "@iconscout/react-unicons";
import weatherPic from "./weather.png";
import cloudPic from './cloud.png'
import rainPic from './rain.png'
import hazePic from './haze.png'
import mistPic from './fog.png'



const Home = () => {
    const [name, setName] = useState("")
    const API_KEY = '899bf0cee935b5d705a7cd2660dff603'
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`

    const [data, setData] = useState({
        celcius:10,
        name:"tokyo",
        humidity: 20,
        speed: 2,
        image: weatherPic
    });
    const [error, setError] = useState('')

    const fetchData=async()=>{
        const url = BASE_URL;
        let response = await fetch(url);
        let parsedData =await response.json();
        setData({celcius:parsedData.main.temp,name: parsedData.name,humidity:parsedData.main.humidity,speed:parsedData.wind.speed})
        console.log(parsedData)
    }

    
    const onChange=(e)=>{
        setName(e.target.value)
    }

    const handleOnClick=async()=>{
      try {
        if(name !== ''){
          const url = BASE_URL;
          let response = await fetch(url);
          let parsedData =await response.json();     
          if(parsedData.cod === '404'){
              setError('Country not found')
          }
          else{
            setError('')
          }
          let imgPath = '';
          if(parsedData.weather[0].main === 'Clear'){
            imgPath = weatherPic;
          }
          else if(parsedData.weather[0].main === 'Clouds'){
            imgPath =cloudPic;
          }
          else if(parsedData.weather[0].main === 'Rain'){
            imgPath = rainPic;
          }
          else if(parsedData.weather[0].main === 'Haze'){
            imgPath = hazePic;
          }
          else if(parsedData.weather[0].main === 'Mist'){
            imgPath = mistPic;
          }

          setData({celcius:parsedData.main.temp,name: parsedData.name,humidity:parsedData.main.humidity,speed:parsedData.wind.speed,image: imgPath})
          console.log(parsedData)

        }
      } catch (error) {
        console.log(error)
      }       
        
    }

  return (
    <>
    <div> 
      <div className="container card mt-5 cardColor" style={{width:"500px"}}>

        <div className="d-flex justify-content-center align-items-center mt-5">

         <div className="input-group mb-3" style={{width:"60%"}}>
          <input type="text" onChange={onChange} className="form-control" placeholder="search city..." aria-label="Username" aria-describedby="basic-addon1"/>
         </div>
         <div >
            <button onClick={handleOnClick} style={{marginTop:"-17px",marginLeft:"10px"}} className="btn-primary btn ml-1">Search</button>
         </div>
         
        </div>
        <div>
          <p className="container d-flex justify-content-center text-white">{error}</p>
         </div>
        <div style={{fontSize:"25px"}} className="weatherPic text-center text-white">
            <img style={{width:"150px"}} src={data.image} className="card-img-top" alt="..." />
            <p>{Math.round(data.celcius)} °C</p>
            <p>{data.name}</p>
        </div>
        <div className="d-flex justify-content-around align-items-center mt-4 text-white mb-5">
         <div>
            <UilTear/>
            <p className="d-inline m-2">Humidity:</p>
            <span>{data.humidity} %</span>
         </div>
         <div>
            <UilWind/>
            <p className="d-inline m-2">Speed:</p>
            <span>{data.speed}</span>
         </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
