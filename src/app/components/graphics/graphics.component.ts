import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ForecastData } from '../../interfaces/Forecast.interface';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnChanges {
  @Input() forecast: ForecastData | undefined;
  chartData: any[] = [];
  humidityChartData: any[] = [];
  colorScheme: string = 'cool';
  currentIndex: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.forecast && this.forecast.list) {
      this.generateChartData();
      this.generateHumidityChartData();
    }
  }

  getDate(n: number): string {
    return new Date(n * 1000).toLocaleDateString();
  }

  getCustomIcon(description: string): string {
    switch (description.toLowerCase()) {
      case 'clear sky':
        return 'assets/icon/sol.png';
      case 'few clouds':
        return 'assets/icon/nublado.png';
      case 'scattered clouds':
      case 'broken clouds':
        return 'assets/icon/nube.png';
      case 'shower rain':
      case 'rain':
        return 'assets/icon/lluvia.png';
      case 'thunderstorm':
        return 'assets/icon/tormenta.png';
      case 'snow':
        return 'assets/icon/nieve.png';
      default:
        return 'assets/icon/sol.png';
    }
  }

  generateChartData(): void {
    this.chartData = [
      {
        name: 'Temperatura Max.Media',
        series: this.forecast!.list!.map(item => ({
          name: this.getDate(item.dt),
          value: item.temp.max
        }))
      },
      {
        name: 'Temperatura Media',
        series: this.forecast!.list!.map(item => ({
          name: this.getDate(item.dt),
          value: (item.temp.max + item.temp.min) / 2
        }))
      },
      {
        name: 'Temperatura Min.Media',
        series: this.forecast!.list!.map(item => ({
          name: this.getDate(item.dt),
          value: item.temp.min
        }))
      },
    ];
  }

  generateHumidityChartData(): void {
    this.humidityChartData = [
      {
        name: 'Humedad',
        series: this.forecast!.list!.map(item => ({
          name: this.getDate(item.dt),
          value: item.humidity
        }))
      }
    ];
  }

  showGraph(): void {
    this.currentIndex = 1;
  }

  showHumidityGraph(): void {
    this.currentIndex = 2;
  }

  showWeeklyForecast(): void {
    this.currentIndex = 0;
  }
  
}
