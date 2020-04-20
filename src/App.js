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
      if (e.key === 'Enter' && this.state.location !== '') {
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
      <div className="container text-center align-middle app">
        <div className="input-group mb-3 mt-3 search">
          <input
            type="text"
            className="search-box form-control shadow p-3 mb-5 bg-white rounded"
            aria-label="Your Location"
            placeholder='Enter Location'
            onChange={this.handleChange}
            value={this.state.location}
            onKeyPress={this.getWeather}
          />
        </div>
        
        { this.state.weather === null
          ? <div className='card pt-3 weather'><h1>Enter your location</h1></div>
          : this.state.weather.cod === '404'
            ? <div className='card pt-3 weather'><h1>Could not find location</h1></div>
            : (
              <React.Fragment>
                <div className={`card pt-3 weather weather${this.state.weather.weather[0].icon}`}>
                    <h1>{this.state.weather.name}, {this.state.weather.sys.country}</h1>
                    <h2 className='temperature'>{Math.round(this.state.weather.main.temp)}°C</h2>
                    <img src={`https://openweathermap.org/img/w/${this.state.weather.weather[0].icon}.png`} alt='Weather Icon' className='icon'/>
                    <p className='text-uppercase'>{this.state.weather.weather[0].description}</p>
                    <p>{Math.round(this.state.weather.wind.speed)} MPH</p>

                    <Weather api={api} location={this.state.location}/>
                </div>
              </React.Fragment>
              
            )
        }

      </div>
    );
  }
}

export default App;