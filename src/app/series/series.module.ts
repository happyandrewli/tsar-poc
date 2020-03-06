import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SeriesPageComponent } from './series-page/series-page.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchComponent } from './search/search.component';
import { NaicsFilterComponent } from './naics-filter/naics-filter.component';
import { SeriesNameFilterComponent } from './filters/series-name-filter/series-name-filter.component';

import { ngfModule, ngf, ngfFormData } from "angular-file";
import { ItemFilterComponent } from './item-filter/item-filter.component';

import { FileSaverModule } from 'ngx-filesaver';
import { SeriesGraphComponent } from './series-graph/series-graph.component';
import { FavoritesModule } from '../favorites/favorites.module';

import { ExportAsModule } from 'ngx-export-as';
import { HighchartsChartModule } from 'highcharts-angular';
import { ItemTypeFilterComponent } from './item-type-filter/item-type-filter.component';

import {SearchAutoCompletePipe} from './search/search-auto-complete.pipe';
import { HighlightSearch } from './series-page/highlight-keyword.pipe';

import { NgHighlightModule } from 'ngx-text-highlight';
@NgModule({
  declarations: [SeriesPageComponent, FiltersComponent, SearchComponent, NaicsFilterComponent, ItemFilterComponent, SeriesGraphComponent, ItemTypeFilterComponent, SearchAutoCompletePipe
    ,HighlightSearch, SeriesNameFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgZorroAntdModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ngfModule,
    FileSaverModule,
    FavoritesModule,
    ExportAsModule,
    HighchartsChartModule,
    NgHighlightModule
  ]
})
export class SeriesModule { }
