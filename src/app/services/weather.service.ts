import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../interfaces/weather.interface';
import { ForecastData, List } from '../interfaces/Forecast.interface';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public foreCastList: List | undefined;
  public dateList: List[] | undefined;

  private API_KEY: string = 'deff8f343eb069fd78e72ddf479912ca';
  private API_URL = (city: string): string => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric`;

  private API_KEY_FORECAST: string = '1f9ccab4cdafe0e22916708e85513df9';
  private API_FORECAST = (city: string, days: number): string => `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${7}&appid=${this.API_KEY_FORECAST}&units=metric`;
  private DAYS: number = 7;

  constructor(private http: HttpClient) {}

  // Previsión diaria
  getWeather(city: string): Observable<WeatherData> {
    console.log('Obteniendo datos meteorológicos para:', city);
    return this.http.get<WeatherData>(this.API_URL(city));
  }

  // Previsión semanal
  getForecast(city: string): Observable<ForecastData> {
    console.log('Obteniendo previsión semanal para:', city);
    return this.http.get<ForecastData>(this.API_FORECAST(city, this.DAYS));
  }

  // Función para formatear la fecha
  getDateString(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  }
}
