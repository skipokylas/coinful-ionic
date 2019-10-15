import { Component, ViewChild, ElementRef, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {

  @Input() chartData: any;
  @Input() chartLabels: any;

  @ViewChild('myCanvas', { static: false }) canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType = 'line';
  public chartColors: any[];
  public chartOptions: any;

  ngOnInit() {

    this.chartColors = [{
      backgroundColor: 'transparent',
      borderColor: '#ffd31a'
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
            beginAtZero: false,
          }
        }]
      },
      elements: {
        point: {
          radius: 0
        },
        line: {
          borderWidth: 1,
          tension: 0
        }
      }
    };
  }
}
