import { Component } from '@angular/core';
import { ClientStatsService } from '../../services/client-stats.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-client-stats',
  imports:  [
    BrowserAnimationsModule,
    NgxChartsModule],
  templateUrl: './client-stats.component.html',
  styleUrl: './client-stats.component.scss'
})
export class ClientStatsComponent {
  data: any[] = []; // Vos données brutes ici
  chartData: any[] = [];
  colorScheme: any = 'vivid';
  // Options du graphique
  view: [number, number] = [800, 400];
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Mois';
  yAxisLabel = 'Nombre de services';
  timeline = true;

  // colorScheme = {
  //   name: 'custom',
  //   selectable: true,
  //   group: 'Custom',
  //   domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  // };

  constructor(private statsService: ClientStatsService) {}

  ngOnInit() {
    // this.chartData = this.statsService.prepareChartData(this.data);
  }
}
