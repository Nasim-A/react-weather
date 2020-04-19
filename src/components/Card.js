import React from 'react'
var moment = require('moment')

const Card = ({ weather }) => { 
    const icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`

    var date = new Date()
    date.setTime(weather.dt * 1000)
    date = moment(date).format('dddd')

    return (
        <div className='card'>
            <h1>{date}</h1>
            <h2>{Math.round(weather.main.temp)}°C</h2>
            <img src={icon} alt='Weather Icon'/>
            <p>{weather.weather[0].description}</p>
            <p>Wind Speed: {Math.round(weather.wind.speed)} MPH</p>
        </div>
    )
  }
  
  export default Card;