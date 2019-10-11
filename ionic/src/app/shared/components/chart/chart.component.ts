import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {

  @Input() chartData: any;

  @ViewChild('myCanvas', { static: false }) canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartDataTest: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;

  ngOnInit() {

    this.chartDataTest = [{
      data: [3, 1, 4, 2, 5, 9, 6, 11, 3],
      //label: 'Anthracnose',
      fill: false
    }];
    this.chartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'f', 'e', 'e', 'q'];
    this.chartColors = [{
      //backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(0, 0, 0, 1)'
    }];
    this.chartOptions = {
      tooltip: {
        display: false
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false,
          ticks: {
            beginAtZero: true,
          }
        }]
      },
      elements: {
        point: {
          radius: 0
        },
        line: {
          borderWidth:1
        }
      }

    }
  };
}
