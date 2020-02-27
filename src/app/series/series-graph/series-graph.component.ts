import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as shape from 'd3-shape';

import * as Highcharts from 'highcharts';
import { Series } from '../state/series.model';

import html2canvas from 'html2canvas';
import { FileSaverService } from 'ngx-filesaver';
@Component({
  selector: 'steps-series-graph',
  templateUrl: './series-graph.component.html',
  styleUrls: ['./series-graph.component.scss']
})
export class SeriesGraphComponent implements OnInit {

  // @Input() series = [];
  updateHighchart = true;

  _series = [];
  get series(){
    return this._series;
  }
  @Input('series')
  set series(series: any[]){
    this._series = series.slice(0,10);
  }
  // @Input('series')
  // set series(value){
  //   this.chartOptions.series = value.map(series=>{
  //     return {
  //       name: series.name.trim(),
  //       data: series.series.map(dataPoint=>{
  //         return parseInt(dataPoint.value);
  //       })
  //     }
  //   });
  //   this.updateHighchart = true;
  //   console.log(this.chartOptions.series);
  // }

  view: any[] = [700, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Statistical Period';
  showYAxisLabel = true;
  yAxisLabel = 'Series';
  timeline = true;
  curve = shape.curveBasis;

  constructor(private fileSaverService: FileSaverService) { }

  ngOnInit() {
  }

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: []
  };

  @ViewChild('screen', {static: false}) screen: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('downloadLink', {static: false}) downloadLink: ElementRef;

  downloadGraph(type: string) {
    html2canvas(this.screen.nativeElement, {height:1000}).then(canvas => {
      // this.canvas.nativeElement.src = canvas.toDataURL();
      // this.downloadLink.nativeElement.href = canvas.toDataURL(`image/${type}`);
      // this.downloadLink.nativeElement.download = `series-diagram.${type}`;
      // this.downloadLink.nativeElement.click();
      canvas.toBlob(blob=>{
        this.fileSaverService.save(blob, `series-diagram.${type}`);
      })
    });
  }
}
