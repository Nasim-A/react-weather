import React, { Component } from 'react';
import Weather from './components/Weather'

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
}

class App extends Component {
  state = {
    location: '',
    weather: null
  }

  handleChange = (e) => {
      this.setState({
          location: e.target.value,
      })
  }

  getWeather = (e) => {
      if (e.key === 'Enter') {
          fetch(`${api.base}weather?q=${this.state.location}&units=metric&APPID=${api.key}`)
              .then(res => res.json())
              .then(result => {
                  this.setState({ weather: result });
                  this.setState({ location: '' });
                  console.log(result);
              });
      }
  }

  render() {
    return (
      <div className="App">

        <div className='search-container'>
            <input
            type='text'
            className='search-box'
            placeholder='Enter Location'
            onChange={this.handleChange}
            value={this.state.location}
            onKeyPress={this.getWeather}
            />
        </div>

        { this.state.weather === null
          ? <h1>Enter your location</h1>
          : this.state.weather.cod === '404'
            ? <h1>Could not find location</h1>
            : (
              <React.Fragment>
                <div className='card'>
                    <h1>{this.state.weather.name}, {this.state.weather.sys.country}</h1>
                    <h2>{Math.round(this.state.weather.main.temp)}°C</h2>
                    <img src={`https://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt='Weather Icon'/>
                    <p>{this.state.weather.weather[0].description}</p>
                    <p>Wind Speed: {Math.round(this.state.weather.wind.speed)} MPH</p>
                </div>
                <Weather api={api} location={this.state.location}/>
              </React.Fragment>
              
            )
        }

      </div>
    );
  }
}

export default App;