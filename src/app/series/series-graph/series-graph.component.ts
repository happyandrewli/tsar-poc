import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as shape from 'd3-shape';

import * as Highcharts from 'highcharts';
import { Series } from '../state/series.model';

import html2canvas from 'html2canvas';
import { FileSaverService } from 'ngx-filesaver';
import { SeriesQuery } from '../state/series.query';
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
  set series(series: Series[]){
    if(this.seriesQuery.filters.itemTypes.length==0){
      this._series = series.filter(series=>{
        return series.item_type == 'CV';
      }).map(series=>{
        return {name: series.name, series: [
          {name: '2015A1', value: series.val2015a1}, 
          {name: '2016A1', value: series.val2016a1}, 
          {name: '2017A1', value: series.val2017a1}, 
          {name: '2018A1', value: series.val2018a1}]}
      });
    } else if (this.seriesQuery.filters.itemTypes.length==1){
      this._series = series.map(series=>{
        return {name: series.name, series: [
          {name: '2015A1', value: series.val2015a1}, 
          {name: '2016A1', value: series.val2016a1}, 
          {name: '2017A1', value: series.val2017a1}, 
          {name: '2018A1', value: series.val2018a1}]}
      });
    } else if  (this.seriesQuery.filters.itemTypes.length > 1){
      series.filter(series=>{
        return series.item_type == this.seriesQuery.filters.itemTypes[0];
      }).map(series=>{
        return {name: series.name, series: [
          {name: '2015A1', value: series.val2015a1}, 
          {name: '2016A1', value: series.val2016a1}, 
          {name: '2017A1', value: series.val2017a1}, 
          {name: '2018A1', value: series.val2018a1}]}
      });
    }
    // this._series = series.slice(0,10);
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

  constructor(private fileSaverService: FileSaverService, private seriesQuery: SeriesQuery) { }

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
