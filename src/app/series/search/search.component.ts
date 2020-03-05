import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { SeriesService } from '../state/series.service';
import { SeriesQuery } from '../state/series.query';
import { UploadChangeParam, UploadFile } from 'ng-zorro-antd/upload';
import { FileSaverService } from 'ngx-filesaver';
import { NzMessageService } from 'ng-zorro-antd';
import { FavoritesService } from 'src/app/favorites/state/favorites.service';
import { Observable } from 'rxjs';
import { Series } from '../state/series.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  seriesList$: Observable<Series[]>;

  constructor(private seriesService: SeriesService,
    private seriesQuery: SeriesQuery,
    private fileSaverService: FileSaverService,
    private message: NzMessageService,
    private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.searchControl.patchValue(this.seriesQuery.searchTerm);
    this.seriesList$ = this.seriesQuery.selectAll();
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map(val => this.runAutoComplete(val)),
      distinctUntilChanged()
    ).subscribe((term) => this.seriesService.updateSearchTerm(term));
  }

  filteredSeries: { value: string, label: string }[] = [];
  runAutoComplete(val: string) {
    if (val.length >= 2) {
      this.seriesService.getSeriesNames(val, this.seriesQuery.filters).subscribe(filteredNames => {
        this.filteredSeries = filteredNames.filter((v, i) => filteredNames.indexOf(v) === i)
          .map(fSeries => {
            return {
              value: fSeries, label: fSeries.replace(new RegExp(val, "gi"), match => {
                return '<a target="_blank">' + match + '</a>';
              })
            };
          });
      });
    } else {
      this.filteredSeries = [];
    }
    return val;
  }

  options: string[] = [];
  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : [];
  }

  hanldeUploadChange(info: { file: UploadFile }): void {
    if (info.file.thumbUrl) {
      this.seriesService.updateSearchTerm(atob(info.file.thumbUrl.split(',')[1]));
      this.searchControl.patchValue(this.seriesQuery.searchTerm);
    }
    // switch (info.file.status){
    //   case 'uploading':
    //     this.loading = true;
    //     break;
    //   case 'done':
    //     this.seriesService.updateSearchTerm(atob(info.file.thumbUrl.split(',')[1]));
    //     this.searchControl.patchValue(this.seriesQuery.searchTerm);
    //   case 'error':
    //     this.msg.error("Network error");
    //     this.loading = false;
    //     break;
    // }
  }

  download() {
    const fileName = "series.txt";
    const fileType = this.fileSaverService.genType(fileName);
    const txtBlog = new Blob([this.seriesQuery.searchTerm], { type: fileType });
    this.fileSaverService.save(txtBlog, fileName);
  }

  confirmAddToFavorites = false;
  listName: string = "";
  addToFavorites() {
    this.confirmAddToFavorites = true;
  }
  addToFavoritesOK() {
    if (this.seriesQuery.searchTerm) {
      this.confirmAddToFavorites = false;
      this.favoritesService.add({ name: this.listName, seriesNames: this.seriesQuery.searchTerm });
      this.message.create('success', 'Your list of series has been saved successfully.');
    } else {
      this.confirmAddToFavorites = false;
      this.message.create('error', 'Please search for some series first.');
    }
  }
  addToFavoritesCancel() {
    this.confirmAddToFavorites = false;
  }
}
