import React, { Component } from 'react';
import { FaBolt, FaCloudRain, FaCloudShowersHeavy, FaSnowflake, FaSun, FaCloud,  } from 'react-icons/fa';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
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
      if (e) {
          fetch(`${api.base}weather?q=${this.state.location}&units=metric&APPID=${api.key}`)
              .then(res => res.json())
              .then(result => {
                  this.setState({ weather: result });
                  this.setState({ location: '' });
                  console.log(result);
              });
      }
  }

  date = (d) => {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
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
            // onKeyPress={this.getWeather}
            />
        </div>
        <button
          onClick={this.getWeather}
          disabled={ this.state.location === '' }
        >
          Get Weather
        </button>

        { this.state.weather === null
          ? <h1>Enter your location</h1>
          : this.state.weather.cod === '404'
            ? <h1>Could not find location</h1>
            : (
              <React.Fragment>
                <div className='location-container'>
                  <h1 className='location-name'>{this.state.weather.name}</h1>
                  <h2 className='location-country'>{this.state.weather.sys.country}</h2>
                  <p className='date'>{this.date(new Date())}</p>
                </div>
          
                <div className='weather-container'>
                  <div className='weather-icon'>
                    { this.state.weather.weather[0].main === 'Thunderstorm'
                      ?  <FaBolt />
                      : this.state.weather.weather[0].main === 'Drizzle'
                        ? <FaCloudRain />
                        : this.state.weather.weather[0].main === 'Rain'
                          ? <FaCloudShowersHeavy />
                          : this.state.weather.weather[0].main === 'Snow'
                            ? <FaSnowflake />
                            : this.state.weather.weather[0].main === 'Clear'
                              ? <FaSun />
                              : this.state.weather.weather[0].main === 'Clouds'
                                ? <FaCloud />
                                : null
                    
                    }
                  </div>
                  <p className='weather-temp'>{`${Math.round(this.state.weather.main.temp)}°C`}</p>
                  <p className='weather-desc'>{this.state.weather.weather[0].description}</p>
                </div>
              </React.Fragment>
            )
        }

      </div>
    );
  }
}

export default App;
