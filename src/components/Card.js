import React from 'react'
var moment = require('moment')

const Card = ({ weather }) => { 
    const icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`

    var date = new Date()
    date.setTime(weather.dt * 1000)
    date = moment(date).format('ddd')

    return (
        <div className='col-md-auto card day'>
            <h1>{date}</h1><br/>
            <p>{Math.round(weather.main.temp)}°C</p>
            <img src={icon} alt='Weather Icon' className='icon mb-3'/>
            <p className='text-uppercase'>{weather.weather[0].description}</p>
            <p>{Math.round(weather.wind.speed)}MPH</p>
        </div>
    )
  }
  
  export default Card;