import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, EMPTY } from 'rxjs';
import { Series } from '../state/series.model';
import { SeriesService } from '../state/series.service';
import { SeriesQuery } from '../state/series.query';
import { switchMap } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ExportAsConfig, ExportAsService } from 'ngx-export-as';
import { FileSaverService } from 'ngx-filesaver';

@Component({
  selector: 'app-series-page',
  templateUrl: './series-page.component.html',
  styleUrls: ['./series-page.component.scss']
})
export class SeriesPageComponent implements OnInit {

  isCollapsed = true;
  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  isLoading$: Observable<boolean>;
  seriesList$: Observable<Series[]>;
  seriesList: Series[];
  ngxSeriesList = [];
  count$: Observable<number>;
  constructor(private seriesService: SeriesService,
    private seriesQuery: SeriesQuery,
    private exportAsService: ExportAsService,
    private fileSaverService: FileSaverService) { }

  ngOnInit() {
    this.isLoading$ = this.seriesQuery.selectLoading();
    this.seriesList$ = this.seriesQuery.selectAll();
    this.search();
    this.count$ = this.seriesQuery.selectCount();

    // combineLatest([
    //   this.seriesQuery.selectFilters$,
    //   this.seriesQuery.selectSearchTerm$
    // ]).pipe(switchMap(([filters, term])=>{
    //     return this.seriesService.getSeriesByNames(term, filters);
    // }), untilDestroyed(this)).subscribe({
    //   error(){
    //   }
    // });
  }
  
  ngOnDestroy() {};

  search(){
    this.seriesService.getSeriesByNames(this.seriesQuery.searchTerm, this.seriesQuery.filters)
      .subscribe(data => {
      // this.seriesList = data.resource.map(dfSeries => {
      //   return {
      //     name: dfSeries.name,
      //   }


      // });
      // this.ngxSeriesList = data.resource.slice(0,9).map(s => {
      //   return {
      //     "name": s.name,
      //     "series": [
      //       {"name": "2014a1", "value": s.val2014a1},
      //       {"name": "2015a1", "value": s.val2015a1},
      //       {"name": "2016a1", "value": s.val2016a1},
      //       {"name": "2017a1", "value": s.val2017a1},
      //       {"name": "2018a1", "value": s.val2018a1}
      //     ]
      //   }
      // })
    });
  }

  exportAsConfig: ExportAsConfig = {
    type: 'csv',
    elementId: 'seriesTable'
  }
  exportSeriesTable(type:string){
    // this.exportAsService.save(this.exportAsConfig, 'series-table').subscribe(()=>{
    // })

    const fileName = `series-table.${type}`;
    const fileType=this.fileSaverService.genType(fileName);

    this.seriesList$.subscribe(data=>{
      let csvData = 'Series, 2014A1, 2015A1, 2016A1, 2017A1, 2018A1 \n';
      data.forEach(series => {
        csvData += series.name.trim() + ',';
        csvData += series.series.map(dataPoint => {
          if(dataPoint.value){
            return dataPoint.value.trim();
          }else{
            return '';
          }
        }).join(',');
        csvData += '\n';
      })
      const txtBlob = new Blob([csvData], {type: fileType});
      this.fileSaverService.save(txtBlob, fileName);


      // let excelData = [];
      // excelData.push(['Series', '2014A1', '2015A1', '2016A1', '2017A1', '2018A1']);
      // excelData.push(...data.map(series=>{
      //   let s = [];
      //   s.push(series.name.trim());
      //   series.series.forEach(v=>{
      //     s.push(v.value);
      //   })
      //   return s;
      // }));
      // const excelBlob = new Blob([excelData], {type: fileType});
      // this.fileSaverService.save(excelBlob, fileName);
    });
  }
}
