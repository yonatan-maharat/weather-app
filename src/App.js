import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

import Weather from './components/weather.component'
import Form from "./components/form.components"

// api.openweathermap.org/data/2.5/weather?q=London,uk
const API_key = 'e4fa0f3f628e0699b86bbcc90333a1ed';


class App extends React.Component{
  
  constructor() {
    super()
    this.state = {
      city:undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    }
    // this.getWeather()

    this.weatherIcon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }

  }

  claCelsius(temp){
    let cell = Math.floor(temp-273.15);
    return cell;
  }

  get_WeatherIcon(icons,rangeID){
    switch(true){
      case rangeID >= 200 && rangeID < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeID >= 500 && rangeID <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeID === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeID >= 801 && rangeID <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
    
  }

  getWeather = async(e) => {

    e.preventDefault()
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city&&country){
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
      const response = await api_call.json();
      console.log(response)
      this.setState({
        city:`${response.name},${response.sys.country}`,
        celsius: this.claCelsius(response.main.temp),
        temp_max: this.claCelsius(response.main.temp_max),
        temp_min: this.claCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      })
  
      this.get_WeatherIcon(this.weatherIcon,response.weather[0].id)
    }else{
      this.setState({error:true})
    }
  }

  render(){
    const {city,country,icon,main,celsius,temp_max,temp_min,description,error} = this.state
    return(
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error}/>
         <Weather 
         city={city} 
         country={country} 
         temp_celsius={celsius}
         temp_max={temp_max}
         temp_min={temp_min}
         description={description}
         weatherIcon={icon}/>
      </div>
    )
  }
}



export default App;

