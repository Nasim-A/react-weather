import React, { Component } from 'react'
import Card from './Card' 

class Weather extends Component {

    state = {
        weatherDaily: []
    }

    componentDidMount = () => {  
        fetch(`${this.props.api.base}forecast?q=${this.props.location}&units=metric&APPID=${this.props.api.key}`)
        .then(res => res.json())
        .then(data => {
        const weatherDaily = data.list.filter(weather => weather.dt_txt.includes('12:00:00'))
        this.setState({
            weatherDaily: weatherDaily
        }, () => console.log(this.state))
        })
    }

    getWeek = () => {
        return this.state.weatherDaily.map((weather, index) => <Card weather={weather} key={index} />)
      }

    render() {
        return (
            <div className='card-list'>{ this.getWeek() }</div>
        )
    }
}

export default Weather
