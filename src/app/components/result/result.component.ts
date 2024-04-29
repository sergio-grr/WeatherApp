import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherData } from '../../interfaces/weather.interface';
import { ForecastData, Weather } from '../../interfaces/Forecast.interface';
import { WeatherService } from '../../services/weather.service';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnChanges {
  @Input() weatherData: WeatherData | undefined;
  @Input() error: string = '';

  activityRecommendation: string = '';
  showButton: boolean = false;
  showRecommendation: boolean = false;



  constructor( private weatherService:WeatherService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && !changes['weatherData'].firstChange) {
      this.updateRecommendation();
    }
  }


  updateRecommendation(): void {
    this.activityRecommendation = this.getActivityRecommendation();
    this.showRecommendation = true;
  }

  getActivityRecommendation(): string {
    if (this.weatherData) {
      const weather = this.weatherData.weather[0].main;
      const weatherDescription = this.weatherData.weather[0].description.toLowerCase();
      switch (weather) {
        case 'Clear':
        case 'Clear Sky':
          return 'Es un día despejado, sal a pasear.';
        case 'Clouds':
        case 'Overcast Clouds':
          return 'Está nublado, podrías ir al cine.';
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
          return 'Está lloviendo, ¿Netflix?';
        case 'Snow':
          return 'Está nevando, ¿qué tal un muñeco de nieve?';
        case 'Mist':
          return 'Hay niebla, ten cuidado si conduces.';
        case 'Fog':
          return 'Hay niebla densa, evita conducir si es posible.';
        case 'Smoke':
          return 'Hay humo en el aire, evita salir de.';
        case 'Haze':
          return 'Hay neblina, limita la exposición al aire libre si es sensible.';
        case 'Dust':
        case 'Sand':
        case 'Ash':
          return 'Hay polvo o cenizas en el aire, usa mascarilla si es necesario.';
        case 'Squall':
          return 'Hay rachas de viento fuertes, asegura objetos sueltos en el exterior.';
        case 'Tornado':
          return 'Hay un tornado, busca refugio inmediatamente y sigue las indicaciones de seguridad.';
        default:
          return 'Disfruta tu día!';
      }
    } else {
      return 'Disfruta tu día';
    }
  }



}
