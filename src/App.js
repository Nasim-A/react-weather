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
        <p>Website by <a href='https://github.com/Nasim-A/react-weather'>Nasim Ahmed <svg height="30" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a></p>
      </div>
    );
  }
}

export default App;