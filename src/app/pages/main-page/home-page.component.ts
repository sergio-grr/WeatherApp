import { Component, OnInit } from '@angular/core';
import { WeatherData } from '../../interfaces/weather.interface';
import { ForecastData } from '../../interfaces/Forecast.interface';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {



  weather: WeatherData | undefined;
  forecastData: ForecastData | undefined;
  error: string = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void { }

  handleSearchCity(weatherData: WeatherData) {
    this.weather = weatherData;
  }

  handleSearchCityForecast(forecastData: ForecastData) {
    this.forecastData = forecastData;
  }
}
